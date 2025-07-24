const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Complaint = sequelize.define('Complaint', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  summary: { type: DataTypes.TEXT },
  companyId: { type: DataTypes.INTEGER, allowNull: false },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'pending' },
  date: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = Complaint;
