const { sequelize, DataTypes } = require('../orm');

const Student = sequelize.define('Student', {
  Student_ID: {
    type: DataTypes.STRING(9),
    primaryKey: true
  },
  Name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  Birth_Date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Gender: {
    type: DataTypes.CHAR(1),
    allowNull: true,
    validate: {
      isIn: [['M', 'F']]
    }
  },
  Email: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  Phone: {
    type: DataTypes.STRING(15),
    allowNull: true
  },
  Address: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  Status: {
    type: DataTypes.STRING(10),
    allowNull: true,
    validate: {
      isIn: [['在學', '休學', '畢業', '退學']]
    }
  },
  Department_ID: {
    type: DataTypes.STRING(5),
    allowNull: true
  }
}, {
  tableName: 'STUDENT',
  timestamps: false
});

module.exports = Student;