const express = require('express');
const router = express.Router();
const operationRepository = require('../models/operation-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await operationRepository.getOperations());
});

router.get('/:id_operation', async (req, res) => {
    const foundOperation = await operationRepository.getOperationById(req.params.id_operation);

    if (foundOperation) {
        res.status(200).send(foundOperation);
        return;
    }
    if (!foundOperation) {
        const foundOperation = null;
        res.status(500).send('Operation not found');
        return ;
    }
    res.send(foundOperation);
});
router.post(
    '/',
    async (req, res) => {
        try {
            await operationRepository.createOperation(req.body);
            res.status(201).send({ message: "Operation créée avec succès" });
        } catch (e) {
            res.status(500).send(e);
        }
    },
);

router.delete('/:id_operation', async (req, res) => {
    await operationRepository.deleteOperation(req.params.id_operation);
    res.status(204).end();
});

exports.initializeRoutes = () => router;