const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const PosteMachine = sequelize.define(
    'PosteMachine',
    {
        id_poste_machine: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
        },
        id_poste: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Poste',
                key: 'id_poste',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        id_machine: {
            type: DataTypes.STRING,
            allowNull: false,
            references: {
                model: 'Machine',
                key: 'id_machine',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
    },
    { tableName: 'poste_machine' }
);

module.exports = PosteMachine;
