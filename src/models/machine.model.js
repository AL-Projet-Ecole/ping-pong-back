const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const machine = sequelize.define(
    'machines',
    {
        id_machine: { primaryKey: true, type: DataTypes.STRING },
        id_post: { foreignKey: true, type: DataTypes.STRING, allowNull: false },
        libelle_machine: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'machines' },
);

module.exports = machine;