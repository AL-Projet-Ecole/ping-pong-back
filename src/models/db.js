const Sequelize = require('sequelize');
require('dotenv').config();

exports.sequelize = new Sequelize(process.env.CONNECTION_STRING)
