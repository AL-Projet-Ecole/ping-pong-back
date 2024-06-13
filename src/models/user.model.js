const { DataTypes } = require('sequelize');
const { sequelize } = require('./db');

const user = sequelize.define(
    'users',
    {
        id_user: { primaryKey: true, type: DataTypes.STRING },
        login_user: { type: DataTypes.STRING, allowNull: false },
        mdp_user: { type: DataTypes.STRING, allowNull: false },
        nom_user: { type: DataTypes.STRING, allowNull: false },
        prenom_user: { type: DataTypes.STRING, allowNull: false },
        email_user: { type: DataTypes.STRING, allowNull: false }
    },
    { tableName: 'users' },
);

module.exports = user;