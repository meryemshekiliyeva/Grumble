const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING },
  icon: { type: DataTypes.STRING },
  bgColor: { type: DataTypes.STRING }
});

module.exports = Category;
