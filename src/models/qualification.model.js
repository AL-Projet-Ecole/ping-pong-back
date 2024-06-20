const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const Qualification = sequelize.define(
    'Qualification',
    {
        id_qualification: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
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
    },
    { tableName: 'qualifications' }
);

module.exports = Qualification;
