// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    /*// 1. INSERT 新增
    let sql = 'INSERT INTO STUDENT (Student_ID, Name, Birth Date, Gender, Email, Phone, Address, Admission_Year, Status, Department_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
    await conn.query(sql, ['S10811001', '王曉明', '2000-05-15','M', 'wang@example.com', '0987-654-321', '台北市信義區信義路五段1號', '2019', '在學', 'CS001']);
    console.log('已新增一筆學生資料');*/
    
    // 2. SELECT 查詢
    sql = 'SELECT * FROM STUDENT WHERE Department_ID = ?';
    const rows = await conn.query(sql, ['CS001']);
    console.log('查詢結果：', rows);

   // 3. UPDATE 更新
   sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
   const result = await conn.query(sql, ['王大明', 'S10811001']);
   if (result.affectedRows === 0) {
    console.error('無法更改姓名');
  } else {
    console.log('已更新學生名稱');
  }
  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}
basicCrud();
