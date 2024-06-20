const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const ListeOperation = sequelize.define(
    'ListeOperation',
    {
        id_liste_operation: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        id_gamme: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'gammes',
                key: 'id_gamme',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        id_operation: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'operations',
                key: 'id_operation',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        id_user: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id_user',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    { tableName: 'liste_operations' }
);

module.exports = ListeOperation;
