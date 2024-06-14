const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const realisation = sequelize.define(
    'realisations',
    {
        id_realisation: { primaryKey: true, type: DataTypes.STRING },
        id_user: { primaryKey: true, type: DataTypes.STRING },
        id_poste: { type: DataTypes.STRING, allowNull: false },
        id_machine: { type: DataTypes.STRING, allowNull: false },
        date_debut_fab: { type: DataTypes.STRING, allowNull: false },
        temps_realisation: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'realisations' },
);

module.exports = realisation;