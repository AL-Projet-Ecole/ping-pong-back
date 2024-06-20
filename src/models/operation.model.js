const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const realisation = sequelize.define(
    'operations',
    {
        id_operation: { primaryKey: true, type: DataTypes.STRING },
        id_machine: { foreignKey: true, type: DataTypes.STRING, allowNull: false },
        libelle_operation: { type: DataTypes.STRING, allowNull: false },
        temps_estimation: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'operations' },
);

module.exports = realisation;