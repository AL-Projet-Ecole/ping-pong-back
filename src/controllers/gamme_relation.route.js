const express = require('express');
const router = express.Router();
const gammeRelationRepository = require('../models/gamme_relation-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await gammeRelationRepository.getGammeRelations());
});

router.get('/:id_gamme_parent', async (req, res) => {
    const foundAllGammeRelation = await gammeRelationRepository.getGammeRelationParent(req.params.id_gamme_parent);

    if (foundAllGammeRelation) {
        res.status(200).send([foundAllGammeRelation]);
        return;
    }
    if (!foundAllGammeRelation) {
        const foundOperation = null;
        res.status(500).send('Gamme enfant not found');
        return ;
    }
    res.send(foundAllGammeRelation);
});

router.get('/:id_gamme_enfant', async (req, res) => {
    const foundAllGammeRelation = await gammeRelationRepository.getGammeRelationEnfant(req.params.id_gamme_enfant);

    if (foundAllGammeRelation) {
        res.status(200).send([foundAllGammeRelation]);
        return;
    }
    if (!foundAllGammeRelation) {
        const foundOperation = null;
        res.status(500).send('Gamme parent not found');
        return ;
    }
    res.send(foundAllGammeRelation);
});
router.post(
    '/',
    async (req, res) => {
        const {nom_user} = req.body;
        try{
            await gammeRelationRepository.createGammeRelation(req.body);
        } catch (e){
            res.status(411).send(e)
        }

    },
);
router.delete('/:id_gamme_parent', async (req, res) => {
    await gammeRelationRepository.deleteGammeRelation(req.params.id_gamme_parent);
    res.status(204).end();
});

exports.initializeRoutes = () => router;