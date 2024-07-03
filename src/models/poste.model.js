const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Poste = sequelize.define(
    'Poste',
    {
        id_poste: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        libelle_poste: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: 'postes' }
);

module.exports = Poste;
