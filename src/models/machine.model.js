const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Machine = sequelize.define(
    'Machine',
    {
        id_machine: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        libelle_machine: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    { tableName: 'machines' }
);

module.exports = Machine;
