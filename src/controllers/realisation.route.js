const express = require('express');
const router = express.Router();
const realisationRepository = require('../models/realisation-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

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
        const {nom_user} = req.body;
        try{
            await realisationRepository.createRealisation(req.body);
        } catch (e){
            res.status(411).send(e)
        }

    },
);
router.delete('/:id_realisation', async (req, res) => {
    await realisationRepository.deleteRealisation(req.params.id_realisation);
    res.status(204).end();
});

exports.initializeRoutes = () => router;