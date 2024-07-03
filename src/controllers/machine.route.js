const express = require('express');
const router = express.Router();
const machineRepository = require('../models/machine-repository');
const { body } = require('express-validator');
const gammeRepository = require("../models/gamme-repository");

router.get('/', async (req, res) => {
    res.send(await machineRepository.getMachines());
});

router.get('/:id_machine', async (req, res) => {
    const foundMachine = await machineRepository.getMachineById(req.params.id_machine);

    if (foundMachine) {
        res.status(200).send(foundMachine);
        return;
    }
    if (!foundMachine) {
        const foundMachine = null;
        res.status(500).send('Machine not found');
        return ;
    }
    res.send(foundMachine);
});

router.post(
    '/',
    body('libelle_machine').notEmpty(),
    async (req, res) => {
        try{
            await machineRepository.createMachine(req.body);
            res.status(201).end();
        } catch (e){
            res.status(411).send(e)
        }

    },
);

router.put('/:id_machine', async (req, res) => {
    try {
        await machineRepository.updateMachine(req.params.id_machine, req.body);
        res.status(204).end();
    } catch (err) {
        console.error('Erreur lors de la mise à jour de la machine:', err);
        res.status(500).json({ error: err.message });
    }
});

router.delete('/:id_machine', async (req, res) => {
    const { id_machine } = req.params;
    try {
        await machineRepository.deleteMachine(id_machine);
        res.status(204).json({ message: 'Machine supprimée avec succès.' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({ message: 'Impossible de supprimer cette machine car elle est référencée par une réalisation.' });
        } else {
            res.status(500).json({ message: 'Erreur serveur.', error: error.message });
        }
    }
});

exports.initializeRoutes = () => router;