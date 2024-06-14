const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const gamme = sequelize.define(
    'gammes',
    {
        id_gamme: { primaryKey: true, type: DataTypes.STRING },
    },
    { tableName: 'gammes' },
);

module.exports = gamme;