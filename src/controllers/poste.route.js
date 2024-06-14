const express = require('express');
const router = express.Router();
const posteRepository = require('../models/poste-repository');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await posteRepository.getPostes());
});

router.get('/:nom_user', async (req, res) => {
    const foundPoste = await posteRepository.getPosteById(req.params.id_poste);

    if (foundPoste) {
        res.status(200).send([foundPoste]);
        return;
    }
    if (!foundPoste) {
        const foundPoste = null;
        res.status(500).send('Poste not found');
        return ;
    }
    res.send(foundPoste);
});
router.post(
    '/',
    body('libelle_poste').notEmpty(),
    async (req, res) => {
        const {libelle_poste} = req.body;
        try{
            const poste = await posteRepository.getPosteByLibelle(libelle_poste);
            if (!poste){
                await posteRepository.createPoste(req.body);
                res.status(201).end();
            }
            else {
                res.status(412).send("Un poste de travail porte deja ce libelle !")
            }
        } catch (e){
            res.status(411).send(e)
        }

    },
);


router.put('/:id_poste', async (req, res) => {
    await posteRepository.updatePoste(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
});

router.delete('/:id_poste', async (req, res) => {
    await posteRepository.deletePoste(req.params.id_poste);
    res.status(204).end();
});

exports.initializeRoutes = () => router;