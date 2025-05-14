const { sequelize, DataTypes } = require('../orm');

const Enrollment = sequelize.define('Enrollment', {
  Student_ID: {
    type: DataTypes.STRING(9),
    primaryKey: true
  },
  Course_ID: {
    type: DataTypes.STRING(8),
    primaryKey: true
  },
  Semester_ID: {
  type: DataTypes.STRING,
  allowNull: false,             
  field: 'Semester_ID'          
},
Enrollment_Date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  Grade: {
        type: DataTypes.DECIMAL(4, 1),
        allowNull: true,
        validate: {
          min: 0,
          max: 100
        }
    },
    Status: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: '修課中',
        validate: {
          isIn: [['修課中', '通過', '不通過', '退選']]
        }
    },

  
}, {
  tableName: 'ENROLLMENT',
  timestamps: false
});

module.exports = Enrollment;