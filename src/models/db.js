const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(`postgres://${process.env.DB_USER}:${process.env.DB_MDP}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`);

sequelize.authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = { sequelize };
