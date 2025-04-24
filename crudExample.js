// crudExample.js
const pool = require('./db');

async function basicCrud() {
  let conn;
  try {
    conn = await pool.getConnection();

    /*// 1. INSERT 新增
    let sql = 'SELECT COUNT(*) AS count FROM STUDENT WHERE Student_ID = ? OR Email = ? OR Phone = ? OR Address = ?';
    const [checkResult] = await conn.query(sql, ['S10810001', 'wangming@example.com', '0977-654-321', '台北市信義區信義路五段2號']);
    
    if (checkResult.count > 0) {
      console.error('新增失敗：學號、Email、電話或地址有重複');
    } else {
      sql = 'INSERT INTO STUDENT (Student_ID, Name, Birth_Date, Gender, Email, Phone, Address, Admission_Year, Status, Department_ID) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      await conn.query(sql, ['S10810001', '王曉明', '2000-07-15', 'M', 'wangming@example.com', '0977-654-321', '台北市信義區信義路五段2號', '2019', '在學', 'CS001']);
      console.log('已新增一筆學生資料');
    }*/

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

   /* // 3. UPDATE 更新
    sql = 'UPDATE STUDENT SET Name = ? WHERE Student_ID = ?';
    const result = await conn.query(sql, ['王大名', 'S10811001']);
    if (result.affectedRows === 0) {
      console.error('無法更改姓名');
    } else {
      console.log('已更新學生名稱');
    }
  // 4. DELETE 刪除
  sql = 'SELECT COUNT(*) AS count FROM STUDENT WHERE Student_ID = ?';
  const [deleteCheckResult] = await conn.query(sql, ['S10810001']);
  
  if (deleteCheckResult.count === 0) {
    console.error('刪除失敗：找不到該學號');
  } else {
    sql = 'DELETE FROM STUDENT WHERE Student_ID = ?';
    await conn.query(sql, ['S10810001']);
    console.log('已刪除該學生資料');
  }*/
  } catch (err) {
    console.error('操作失敗：', err);
  } finally {
    if (conn) conn.release();
  }
}
basicCrud();

