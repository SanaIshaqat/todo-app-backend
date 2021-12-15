'use strict';

const { Sequelize, DataTypes } = require('sequelize');
const todoModel = require('./todo/model');
const userModel = require('./users');
const Collection = require('./data-collection.js');



const DATABASE_URL = process.env.NODE_ENV === 'test' ? 'sqlite:memory:' : process.env.DATABASE_URL || 'postgres://localhost:5432/todoapp';
const DATABASE_CONFIG = process.env.NODE_ENV === 'production' ? { 
  dialectOptions: { 
    ssl: { 
      require: true, 
      rejectUnauthorized: false 
    } 
  } } : {}

  const sequelize = new Sequelize(DATABASE_URL, DATABASE_CONFIG);
// const sequelize = new Sequelize(DATABASE_URL, sequelizeOptions);
const todo = todoModel(sequelize, DataTypes);


module.exports = {
  db: sequelize,
  todo: new Collection(todo),
  users: userModel(sequelize, DataTypes),
};