const express = require('express');
const router = express.Router();
const realisationRepository = require('../models/realisation-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');
const posteRepository = require("../models/poste-repository");

router.get('/', async (req, res) => {
    res.send(await realisationRepository.getRealisations());
});

router.get('/:id_realisation', async (req, res) => {
    const foundRealisation = await realisationRepository.getRealisationById(req.params.id_realisation);

    if (foundRealisation) {
        res.status(200).send([foundRealisation]);
        return;
    }
    if (!foundRealisation) {
        const foundRealisation = null;
        res.status(500).send('Realisation not found');
        return ;
    }
    res.send(foundRealisation);
});

router.post(
    '/',
    async (req, res) => {
        try {
            await realisationRepository.createRealisation(req.body);
            res.status(201).end();
        } catch (e) {
            console.error("Erreur lors de la création de la réalisation :", e);
            res.status(500).json({ error: 'Erreur serveur lors de la création de la réalisation.', e });
        }
    },
);


router.delete('/:id_realisation', async (req, res) => {
    await realisationRepository.deleteRealisation(req.params.id_realisation);
    res.status(204).end();
});

exports.initializeRoutes = () => router;