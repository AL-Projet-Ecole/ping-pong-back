const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const poste = sequelize.define(
    'poste',
    {
        id_poste: { primaryKey: true, type: DataTypes.STRING },
        libelle_poste: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'postes' },
);

module.exports = poste;