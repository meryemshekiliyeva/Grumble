const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Company = sequelize.define('Company', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  categoryId: { type: DataTypes.INTEGER, allowNull: false },
  complaintCount: { type: DataTypes.INTEGER, defaultValue: 0 },
  icon: { type: DataTypes.STRING },
  bgColor: { type: DataTypes.STRING }
});

module.exports = Company;
