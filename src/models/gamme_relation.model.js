const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const GammeRelation = sequelize.define(
    'GammeRelation',
    {
        id_gamme_parent: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'gammes',
                key: 'id_gamme',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        id_gamme_enfant: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'gammes',
                key: 'id_gamme',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    { tableName: 'gamme_relations' }
);

module.exports = GammeRelation;
