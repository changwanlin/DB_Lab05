// transactionExample.js
const pool = require('./db');

async function doTransaction() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();
        const studentId = 'S10810001';
        const checkSql = 'SELECT Student_ID, Name, Department_ID FROM STUDENT WHERE Student_ID = ?';
        const rows = await conn.query(checkSql, ['S10810001']);
        if (rows.length === 0) {
            throw new Error('查無該學生資料，交易取消');
        }
        
        const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
        await conn.query(updateStudent, ['EE001', 'S10810001']);
        const updateRows = await conn.query(checkSql, [studentId]);
        await conn.commit();
        console.log('交易成功，已提交');
        console.log('修改後學生資料：');
        console.table(updateRows);


    } catch (err) {
        if (conn) await conn.rollback();
        console.error('交易失敗，已回滾：', err);
    } finally {
        if (conn) conn.release();
    }
}

doTransaction();
