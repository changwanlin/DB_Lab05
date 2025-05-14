const { sequelize, DataTypes } = require('../orm');

const Course = sequelize.define('Course', {
  Course_ID: {
    type: DataTypes.STRING(8),
    primaryKey: true
  },
  Title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  Credits: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  Department_ID: {
    type: DataTypes.CHAR(5),
    allowNull: true,
    references: {
      model: 'DEPARTMENT',
      key: 'Department_ID'
    }
  }
}, {
  tableName: 'COURSE',
  timestamps: false
});

module.exports = Course;