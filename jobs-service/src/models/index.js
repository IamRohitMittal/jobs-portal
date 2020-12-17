// write like this guideline https://dev.to/hugo__df/using-es6-classes-for-sequelize-4-models-17ga

const cls = require('cls-hooked');

import { Sequelize } from "sequelize";
import config from '~/config/config';
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {};

const namespace = cls.createNamespace('db-namespace');
Sequelize.useCLS(namespace);

const sequelize = new Sequelize(
  config.db.name,
  config.db.user,
  config.db.password, {
  host: config.db.host,
  port: config.db.port,
  dialect: config.db.dialect,
  pool: {
    max: config.db.pool.max,
    min: config.db.pool.min,
    acquire: config.db.pool.acquire,
    idle: config.db.pool.idle
  }
})
// **************** This is required for webpack***********
// let model = require('./supplier.model')(sequelize, Sequelize.DataTypes);
// db[model.name] = model;
// ********************************************************

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
