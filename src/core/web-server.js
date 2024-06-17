const express = require('express');
const { initializeConfigMiddlewares, initializeErrorMiddlwares } = require('./middlewares');
const testRoutes = require('../controllers/test.route');
const userRoutes = require('../controllers/user.route');
const machineRoutes = require('../controllers/machine.route');
const posteRoutes = require('../controllers/poste.route');
const realisationRoutes = require('../controllers/realisation.route');
const operationRoutes = require('../controllers/operation.route');
const {sequelize} = require("../models/db");

class WebServer {
    app = undefined;
    port = process.env.PORT;
    server = undefined;

    constructor() {
        this.app = express();
        //{force : true}
        sequelize.sync({force : true})
        initializeConfigMiddlewares(this.app);
        this._initializeRoutes();
        initializeErrorMiddlwares(this.app);
    }

    start() {
        this.server = this.app.listen(this.port, () => {
            console.log(`Example app listening on port ${this.port}`);
        });
    }

    stop() {
        this.server.close();
    }

    _initializeRoutes() {
        this.app.use('/tests', testRoutes.initializeRoutes());
        this.app.use('/users', userRoutes.initializeRoutes());
        this.app.use('/machines', machineRoutes.initializeRoutes());
        this.app.use('/postes', posteRoutes.initializeRoutes());
        this.app.use('/realisations', realisationRoutes.initializeRoutes());
        this.app.use('/operations', operationRoutes.initializeRoutes());
    }
}

module.exports = WebServer;