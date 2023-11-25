const { DataTypes } = require('sequelize');
const sequelize = require('./db'); // ou qualquer que seja o seu arquivo de configuração do Sequelize

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  timestamps: true, // Adiciona createdAt e updatedAt
  underscored: true, // Convenção para usar snake_case em vez de camelCase
});

module.exports = Product;
