const express = require('express');
const router = express.Router();
const listeOperationRepository = require('../models/liste_operation-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await listeOperationRepository.getListeOperations());
});

router.get('/:id_gamme', async (req, res) => {
    try {
        const foundAllListeOperation = await listeOperationRepository.getListeOperationById(req.params.id_gamme);

        if (foundAllListeOperation) {
            res.status(200).send(foundAllListeOperation);
        } else {
            res.status(404).send('Operation not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.get('/Unassigned/:id_gamme', async (req, res) => {
    try {
        const foundUnassignedListeOperation = await listeOperationRepository.getUnassignedListeOperationById(req.params.id_gamme);

        if (foundUnassignedListeOperation) {
            res.status(200).send(foundUnassignedListeOperation);
        } else {
            res.status(404).send('Operation not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
    async (req, res) => {
        try{
            await listeOperationRepository.createListeOperation(req.body);
            res.status(201).send({ message: "Operation créée avec succès" });
        } catch (e){
            res.status(500).send(e);
        }

    },
);
router.delete('/:id_liste_operation', async (req, res) => {
    await listeOperationRepository.deleteListeOperation(req.params.id_liste_operation);
    res.status(204).end();
});

exports.initializeRoutes = () => router;