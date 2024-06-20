const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const liste_operation = sequelize.define(
    'liste_operations',
    {
        id_liste_operation: { primaryKey: true, type: DataTypes.STRING },
        id_gamme: { primaryKey: true, type: DataTypes.STRING },
        id_operation: { primaryKey: true, type: DataTypes.STRING },
        id_user: { primaryKey: true, type: DataTypes.STRING },
    },
    { tableName: 'liste_operations' },
);

module.exports = liste_operation;