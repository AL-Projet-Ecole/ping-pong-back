const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const OperationMachine = sequelize.define('OperationMachine', {
    id_operation_machine: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
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
}, { tableName: 'operation_machine' });

module.exports = OperationMachine;