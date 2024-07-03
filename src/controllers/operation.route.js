const express = require('express');
const router = express.Router();
const operationRepository = require('../models/operation-repository');

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

router.put('/:id_operation', async (req, res) => {
    try {
        await operationRepository.updateOperation(req.params.id_operation, req.body);
        res.status(204).end();
    } catch (err) {
        console.error('Erreur lors de la mise à jour de l opération:', err);
        res.status(500).json({ error: err.message });
    }
});


router.delete('/:id_operation', async (req, res) => {
    await operationRepository.deleteOperation(req.params.id_operation);
    res.status(204).end();
});

router.delete('/:id_operation', async (req, res) => {
    const { id_operation } = req.params;
    try {
        await operationRepository.deleteOperation(id_operation);
        res.status(204).json({ message: 'Opération supprimée avec succès.' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({ message: 'Impossible de supprimer cette opération car elle est référencée par une réalisation.' });
        } else {
            res.status(500).json({ message: 'Erreur serveur.', error: error.message });
        }
    }
});

exports.initializeRoutes = () => router;