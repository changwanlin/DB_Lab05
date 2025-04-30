// transactionExample.js
const pool = require('./db');

async function doTransaction() {
    let conn;
    try {
        conn = await pool.getConnection();
        await conn.beginTransaction();
        const checkSql = 'SELECT Student_ID, Name, Department_ID FROM STUDENT WHERE Student_ID = ?';
        const rows = await conn.query(checkSql, ['S10811001']);

        /*if (rows.length > 0) {
            console.log('修改後學生資料：');
            console.table(rows);
        } else {
            console.log('查無該學生資料');
        }*/

        const updateStudent = 'UPDATE STUDENT SET Department_ID = ? WHERE Student_ID = ?';
        await conn.query(updateStudent, ['EE001', 'S10811001']);
        if (rows.length > 0) {
            await conn.commit();
            console.log('交易成功，已提交');
            console.log('修改後學生資料：');
            console.table(rows);
        } else {
            console.log('查無該學生資料');
        }

    } catch (err) {
        if (conn) await conn.rollback();
        console.error('交易失敗，已回滾：', err);
    } finally {
        if (conn) conn.release();
    }
}

doTransaction();
