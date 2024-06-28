const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const gamme = sequelize.define(
    'gammes',
    {
        id_gamme: { primaryKey: true, type: DataTypes.STRING },
        titre_gamme: { type: DataTypes.STRING, allowNull: false },
        description_gamme: { type: DataTypes.STRING, allowNull: true },
        quantite_gamme: { type: DataTypes.BIGINT, allowNull: true },
        prix_gamme: { type: DataTypes.FLOAT, allowNull: true },
        provenance_gamme: { type: DataTypes.STRING, allowNull: true },
        id_responsable: { type: DataTypes.STRING, allowNull: true },
    },
    { tableName: 'gammes' },
);

module.exports = gamme;