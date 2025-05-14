// transferStudent.js
const { sequelize, Student, Course, Enrollment } = require('./models');

async function transferStudent(studentId, oldDeptId, newDeptId) {
  const transaction = await sequelize.transaction();

  try {
    // 1. 更新學生所屬系所
    await Student.update(
      { Department_ID: newDeptId },
      { 
        where: { Student_ID: studentId },
        transaction
      }
    );

    // 2. 查詢舊系所課程 ID
    const oldCourses = await Course.findAll({
      attributes: ['Course_ID'],
      where: { Department_ID: oldDeptId },
      transaction
    });

    const oldCourseIds = oldCourses.map(course => course.Course_ID);

    // 3. 標記舊系課程為「退選」
    if (oldCourseIds.length > 0) {
      await Enrollment.update(
        { Status: '退選' },
        {
          where: {
            Student_ID: studentId,
            Course_ID: oldCourseIds
          },
          transaction
        }
      );
    }

    // 4. 查詢新系課程
    const newCourses = await Course.findAll({
      attributes: ['Course_ID'],
      where: { Department_ID: newDeptId },
      transaction
    });

    // 5. 建立修課記錄
    const currentSemester = '112-2';
    const enrollmentRecords = newCourses.map(course => ({
      Student_ID: studentId,
      Course_ID: course.Course_ID,
      Semester_ID: currentSemester,
      Enrollment_Date: new Date(),     // 明確指定時間
      Status: '修課中'
    }));

    if (enrollmentRecords.length > 0) {
      await Enrollment.bulkCreate(enrollmentRecords, {
        fields: ['Student_ID', 'Course_ID', 'Semester_ID', 'Enrollment_Date', 'Status'],
        transaction
      });
    }

    await transaction.commit();
    console.log(`學生 ${studentId} 已從 ${oldDeptId} 轉到 ${newDeptId}`);
  } catch (err) {
    await transaction.rollback();
    console.error('轉系處理失敗：', err.message);
  }
}

// 範例呼叫
transferStudent('S10811001', 'EE001', 'CS001')
  .then(() => console.log('轉系處理完成'))
  .catch(err => console.error('執行錯誤:', err));
