const express = require('express');
const router = express.Router();
const listeOperationRepository = require('../models/liste_operation-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await listeOperationRepository.getListeOperations());
});

router.get('/:id_gamme', async (req, res) => {
    const foundAllListeOperation = await listeOperationRepository.getListeOperationById(req.params.id_gamme);

    if (foundAllListeOperation) {
        res.status(200).send([foundAllListeOperation]);
        return;
    }
    if (!foundAllListeOperation) {
        const foundOperation = null;
        res.status(500).send('Operation not found');
        return ;
    }
    res.send(foundAllListeOperation);
});
router.post(
    '/',
    async (req, res) => {
        const {nom_user} = req.body;
        try{
            await listeOperationRepository.createListeOperation(req.body);
        } catch (e){
            res.status(411).send(e)
        }

    },
);
router.delete('/:id_liste_operation', async (req, res) => {
    await listeOperationRepository.deleteListeOperation(req.params.id_liste_operation);
    res.status(204).end();
});

exports.initializeRoutes = () => router;