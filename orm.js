/*// orm.js
const { Sequelize, DataTypes } = require('sequelize');


const sequelize = new Sequelize('university_db', 'root', '930219', {
  host: 'localhost',
  dialect: 'mariadb'
});
module.exports = { sequelize, DataTypes };
require('./models');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('資料庫連線成功！');

    await sequelize.sync();
    console.log('模型已同步至資料庫！');

  } catch (error) {
    console.error('無法連線至資料庫：', error);
  }
}
testConnection();*/
/*const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('university_db', 'root', '930219', {
  host: 'localhost',
  dialect: 'mariadb'
});

module.exports = { sequelize, DataTypes }; 


async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('資料庫連線成功！');
    await sequelize.sync();
    console.log('模型已同步至資料庫！');
  } catch (error) {
    console.error('無法連線至資料庫：', error);
  }
}
testConnection();*/

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('university_db', 'root', '930219', {
  host: 'localhost',
  dialect: 'mariadb',
  logging: false
});

module.exports = { sequelize, DataTypes };

