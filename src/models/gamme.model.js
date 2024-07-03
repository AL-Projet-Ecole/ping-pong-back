const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const gamme = sequelize.define(
    'gammes',
    {
        id_gamme: { primaryKey: true, type: DataTypes.STRING },
        titre_gamme: { type: DataTypes.STRING, allowNull: false },
        description_gamme: { type: DataTypes.STRING, allowNull: true },
        prix_gamme: { type: DataTypes.FLOAT, allowNull: true },
        provenance_gamme: { type: DataTypes.STRING, allowNull: true },
        id_responsable: { type: DataTypes.STRING, allowNull: true },
        type_gamme: { type: DataTypes.STRING, allowNull: false, defaultValue: "Livrable" },
        stock_gamme: { type: DataTypes.BIGINT, allowNull: false, defaultValue: 1 }
    },
    { tableName: 'gammes' },
);

module.exports = gamme;