const express = require('express');
const router = express.Router();
const qualificationRepository = require('../models/qualification-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await qualificationRepository.getQualifications());
});

router.get('/:id_poste', async (req, res) => {
    const foundAllQualification = await qualificationRepository.getUsersQualifiedForPoste(req.params.id_poste);

    if (foundAllQualification) {
        res.status(200).send([foundAllQualification]);
        return;
    }
    if (!foundAllQualification) {
        const foundOperation = null;
        res.status(500).send('Qualification not found');
        return ;
    }
    res.send(foundAllQualification);
});

router.get('/:id_user', async (req, res) => {
    const foundAllQualification = await qualificationRepository.getPostesByUser(req.params.id_user);

    if (foundAllQualification) {
        res.status(200).send([foundAllQualification]);
        return;
    }
    if (!foundAllQualification) {
        const foundOperation = null;
        res.status(500).send('Qualification not found');
        return ;
    }
    res.send(foundAllQualification);
});

router.post(
    '/',
    async (req, res) => {
        const {nom_user} = req.body;
        try{
            await qualificationRepository.createQualification(req.body);
        } catch (e){
            res.status(411).send(e)
        }

    },
);
router.delete('/:id_qualification', async (req, res) => {
    await qualificationRepository.deleteQualification(req.params.id_qualification);
    res.status(204).end();
});

exports.initializeRoutes = () => router;