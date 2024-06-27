const express = require('express');
const router = express.Router();
const posteMachineRepository = require('../models/poste_machine-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await posteMachineRepository.getPosteMachines());
});

router.get('/listMachine/:id_poste', async (req, res) => {
    const foundAllMachine = await posteMachineRepository.getPosteMachineById(req.params.id_poste);

    if (foundAllMachine) {
        res.status(200).send([foundAllMachine]);
        return;
    }
    if (!foundAllMachine) {
        const foundOperation = null;
        res.status(500).send('Machine not found');
        return ;
    }
    res.send(foundAllMachine);
});

router.get('/listPost/:id_machine', async (req, res) => {
    const foundAllPoste = await posteMachineRepository.getMachinePosteById(req.params.id_machine);

    if (foundAllPoste) {
        res.status(200).send([foundAllPoste]);
        return;
    }
    if (!foundAllPoste) {
        const foundAllPost = null;
        res.status(500).send('Poste not found');
        return ;
    }
    res.send(foundAllPoste);
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