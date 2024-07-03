const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const initJsonHandlerMiddleware = (app) => {
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
};

const initCorsMiddleware = (app) => app.use(cors());

const initLoggerMiddleware = (app) => {
    app.use((req, res, next) => {
        const begin = Date.now();

        res.on('finish', () => {
            const requestDate = new Date(begin).toISOString();
            const remoteIP = `IP: ${req.connection.remoteAddress}`;
            const httpInfo = `${req.method} ${req.baseUrl || req.path}`;
            const requestDuration = `Duration: ${Date.now() - begin}ms`;

            console.log(`[${requestDate}] - [${remoteIP}] - [${httpInfo}] - [${requestDuration}]`);
        });
        next();
    });
};

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');

    if (!token) {
        return res.status(401).send('Access denied. No token provided.');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (ex) {
        res.status(400).send('Invalid token.');
    }
};

exports.initializeConfigMiddlewares = (app) => {
    initJsonHandlerMiddleware(app);
    initCorsMiddleware(app);
    initLoggerMiddleware(app);
};

exports.initializeAuthMiddleware = (app) => {
    app.use(authMiddleware);
};

exports.initializeErrorMiddlewares = (app) => {
    app.use((err, req, res, next) => {
        if (err.code === 'permission_denied') {
            res.status(403).send('Forbidden');
            return;
        }

        res.status(500).send(err.message);
    });
};
