const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const testRoutes = require('../controllers/test.route');
const authRoutes = require('../controllers/auth.route');
const userRoutes = require('../controllers/user.route');
const machineRoutes = require('../controllers/machine.route');
const posteRoutes = require('../controllers/poste.route');
const realisationRoutes = require('../controllers/realisation.route');
const operationRoutes = require('../controllers/operation.route');
const gammeRoutes = require('../controllers/gamme.route');
const listOperationRoutes = require('../controllers/liste_operation.route');
const postMachinesRoutes = require('../controllers/liste_operation.route');
const { sequelize } = require("../models/db");

// Importation des modèles
const Poste = require('../models/poste.model');
const Machine = require('../models/machine.model');
const PosteMachine = require('../models/poste_machine.model');
const Gamme = require('../models/gamme.model');
const Operation = require('../models/operation.model');
const ListeOperation = require('../models/liste_operation.model');
const User = require('../models/user.model');
const Qualification = require('../models/qualification.model');
const GammeRelation = require('../models/gamme_relation.model');

class WebServer {
    app = undefined;
    port = process.env.PORT;
    server = undefined;

    constructor() {
        this.app = express();

        // Définir les relations entre les modèles
        this._initializeModelRelations();

        // Synchroniser les modèles avec la base de données
        // { force: true }
        sequelize.sync();

        // Initialiser les middlewares
        initializeConfigMiddlewares(this.app);

        // Initialiser les routes
        this._initializeRoutes();

        // Initialiser les middlewares d'erreur
        initializeErrorMiddlwares(this.app);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Ping pong app listening on port ${this.port}`);
        });
    }

    stop() {
        this.server.close();
    }

    _initializeRoutes() {
        this.app.use('/tests', testRoutes.initializeRoutes());
        this.app.use('/users', userRoutes.initializeRoutes());
        this.app.use('/auth', authRoutes.initializeRoutes());
        this.app.use('/machines', machineRoutes.initializeRoutes());
        this.app.use('/postes', posteRoutes.initializeRoutes());
        this.app.use('/realisations', realisationRoutes.initializeRoutes());
        this.app.use('/operations', operationRoutes.initializeRoutes());
        this.app.use('/gammes', gammeRoutes.initializeRoutes());
        this.app.use('/listeOperations', listOperationRoutes.initializeRoutes());
        this.app.use('/postMachines', postMachinesRoutes.initializeRoutes());
    }

    _initializeModelRelations() {
        // Relations Poste - Machine
        Poste.belongsToMany(Machine, {
            through: PosteMachine,
            foreignKey: 'id_poste',
            otherKey: 'id_machine',
        });

        Machine.belongsToMany(Poste, {
            through: PosteMachine,
            foreignKey: 'id_machine',
            otherKey: 'id_poste',
        });

        // Relations Gamme - Operation
        Gamme.belongsToMany(Operation, {
            through: ListeOperation,
            foreignKey: 'id_gamme',
            otherKey: 'id_operation',
        });

        Operation.belongsToMany(Gamme, {
            through: ListeOperation,
            foreignKey: 'id_operation',
            otherKey: 'id_gamme',
        });

        // Relations User - Poste
        User.belongsToMany(Poste, {
            through: Qualification,
            foreignKey: 'id_user',
            otherKey: 'id_poste',
        });

        Poste.belongsToMany(User, {
            through: Qualification,
            foreignKey: 'id_poste',
            otherKey: 'id_user',
        });

        // Relations Gamme - Gamme (Parent-Enfant)
        Gamme.belongsToMany(Gamme, {
            through: GammeRelation,
            as: 'Enfants',
            foreignKey: 'id_gamme_parent',
            otherKey: 'id_gamme_enfant',
        });

        Gamme.belongsToMany(Gamme, {
            through: GammeRelation,
            as: 'Parents',
            foreignKey: 'id_gamme_enfant',
            otherKey: 'id_gamme_parent',
        });
    }
}

module.exports = WebServer;
