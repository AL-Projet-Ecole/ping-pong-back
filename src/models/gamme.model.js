const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const gamme = sequelize.define(
    'gammes',
    {
        id_gamme: { primaryKey: true, type: DataTypes.STRING },
        titre_gamme: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'gammes' },
);

module.exports = gamme;