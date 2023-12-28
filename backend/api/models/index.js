const Sequelize = require('sequelize');
const sequelize = require('../../config/database');
const normalizedPath = require('path').join(__dirname, 'models');
const models = {};
require('fs').readdirSync(normalizedPath).forEach((file) => {
  if (file.indexOf('.js') >= 0) {
    models[file.replace('.js', '')] = require(`${normalizedPath}/${file}`)(sequelize, Sequelize);
  }
});
const { users,movies} = models;

// orderPrice.belongsTo(orders, { foreignKey: 'orderId', sourceKey: 'id' });
// orders.hasOne(orderPrice, { foreignKey: 'orderId', sourceKey: 'id', onDelete: 'cascade', hooks: true });

// orderDeliveries.belongsTo(orders, { foreignKey: 'reference', sourceKey: 'reference' });
// orders.hasMany(orderDeliveries, { foreignKey: 'reference', sourceKey: 'reference', onDelete: 'cascade', hooks: true });

// -------------------------------------------------------------------------------------------

// order_pricing.belongsTo(order_table, { foreignKey: 'orderId', sourceKey: 'id', onDelete: 'cascade', hooks: true });
// order_table.hasOne(order_pricing, { foreignKey: 'orderId', sourceKey: 'id', onDelete: 'cascade', hooks: true });

// order_delivering.belongsTo(order_table, { foreignKey: 'reference', sourceKey: 'reference', onDelete: 'cascade', hooks: true });
// order_table.hasMany(order_delivering, { foreignKey: 'reference', sourceKey: 'reference', onDelete: 'cascade', hooks: true });

module.exports = models;