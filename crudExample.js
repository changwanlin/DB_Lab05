// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    // 1. INSERT 新增
    let sql = 'INSERT IGNORE INTO STUDENT (Student_ID, Name, Birth_Date, Gender, Email, Phone, Address, Admission_Year, Status, Department_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const result = await conn.query(sql, ['S10810001', '王曉明', '2000-07-15', 'M', 'wangming@example.com', '0977-654-321', '台北市信義區信義路五段2號', '2019', '在學', 'CS001']);
    console.log(result.affectedRows > 0 ? '已新增一筆學生資料' : '學號已存在');


    // 2. SELECT 查詢
    sql = 'SELECT COUNT(*) AS count FROM STUDENT WHERE Department_ID = ?';
    const [departmentCheckResult] = await conn.query(sql, ['CS001']);
    
    if (departmentCheckResult.count > 0) {
      sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
      const rows = await conn.query(sql, ['CS001']);
      console.log('查詢結果：', rows);
    } else {
      console.error('查詢失敗：查無該系級');
    }


    // 3. UPDATE 更新
    sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
     const result1 = await conn.query(sql, ['王小明', 'S10810001']);
     if (result1.affectedRows === 0) {
       console.error('學號不存在，無法更改姓名');
     } else {
       console.log('已更新學生名稱');
     }

    // 4. DELETE 刪除
    sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
    const result3 = await conn.query(sql, ['S10810001']);
    if (result3.affectedRows === 0) {
      console.error('學號不存在，無法刪除');

    } else {
      console.log('已刪除該學生');
    }


  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}
basicCrud();
