const express = require('express');
const router = express.Router();
const posteMachineRepository = require('../models/poste_machine-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await posteMachineRepository.getPosteMachines());
});

router.get('/:id_gamme', async (req, res) => {
    const foundAllPosteMachine = await posteMachineRepository.getPosteMachineById(req.params.id_gamme);

    if (foundAllPosteMachine) {
        res.status(200).send([foundAllPosteMachine]);
        return;
    }
    if (!foundAllPosteMachine) {
        const foundOperation = null;
        res.status(500).send('Operation not found');
        return ;
    }
    res.send(foundAllPosteMachine);
});
router.post(
    '/',
    async (req, res) => {
        const {nom_user} = req.body;
        try{
            await posteMachineRepository.createPosteMachine(req.body);
        } catch (e){
            res.status(411).send(e)
        }

    },
);
router.delete('/:id_poste_machine', async (req, res) => {
    await posteMachineRepository.deletePosteMachine(req.params.id_poste_machine);
    res.status(204).end();
});

exports.initializeRoutes = () => router;