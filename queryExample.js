// queryExample.js
/*const pool = require('./db');

async function findUngraded() {
  let conn;
  try {
    conn = await pool.getConnection();
    
    // 使用 JOIN 連結多個表格
    const sql = `
      SELECT s.Student_ID, s.Name, c.Course_ID, c.Title
      FROM STUDENT s
      JOIN ENROLLMENT e ON s.Student_ID = e.Student_ID
      JOIN COURSE c ON e.Course_ID = c.Course_ID
      WHERE e.Grade IS NULL
    `;
    
    const results = await conn.query(sql);
    console.log('未評分的選課記錄：');
    results.forEach(row => {
      console.log(`學生：${row.Name} (${row.Student_ID}), 課程：${row.Title} (${row.Course_ID})`);
    });
    
    return results;
  } catch (err) {
    console.error('查詢失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}

findUngraded();*/
// queryExample.js
const { Student, Course, Enrollment } = require('./models');

async function findUngraded() {
  try {
    const results = await Student.findAll({
      attributes: ['Student_ID', 'Name'],
      include: [{
        model: Enrollment,
        required: true, // 強制 INNER JOIN（有條件才回傳）
        where: { Grade: null },
        include: [{
          model: Course,
          attributes: ['Course_ID', 'Title']
        }]
      }]
    });

    console.log('未評分的選課記錄：');
    results.forEach(student => {
      student.Enrollments.forEach(enrollment => {
        const course = enrollment.Course;
        console.log(`學生：${student.Name} (${student.Student_ID}), 課程：${course.Title} (${course.Course_ID})`);
      });
    });

    return results;
  } catch (err) {
    console.error('查詢失敗：', err);
  }
}

findUngraded()
  .then(() => console.log('查詢完成'))
  .catch(err => console.error('執行錯誤:', err));


