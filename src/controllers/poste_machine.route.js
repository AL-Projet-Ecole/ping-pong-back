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
        res.status(200).send(foundAllMachine);
        return;
    }
    if (!foundAllMachine) {
        const foundAllMachine = null;
        res.status(500).send('Machine not found');
        return ;
    }
    res.send(foundAllMachine);
});

router.get('/listPost/:id_machine', async (req, res) => {
    const foundAllPoste = await posteMachineRepository.getMachinePosteById(req.params.id_machine);

    if (foundAllPoste) {
        res.status(200).send(foundAllPoste);
        return;
    }
    if (!foundAllPoste) {
        const foundAllPost = null;
        res.status(500).send('Poste not found');
        return ;
    }
    res.send(foundAllPoste);
});

router.get('/Unassigned/:id_poste', async (req, res) => {
    try {
        const foundUnassignedListeMachine = await posteMachineRepository.getUnassignedListePosteMachineById(req.params.id_poste);

        if (foundUnassignedListeMachine) {
            res.status(200).send(foundUnassignedListeMachine);
        } else {
            res.status(404).send('Operation not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post(
    '/',
    async (req, res) => {
        try{
            await posteMachineRepository.createPosteMachine(req.body);
            res.status(201).send({ message: "Relation Poste/Machine créée avec succès" });
        } catch (e){
            res.status(500).send(e)
        }

    },
);
router.delete('/:id_poste_machine', async (req, res) => {
    await posteMachineRepository.deletePosteMachine(req.params.id_poste_machine);
    res.status(204).end();
});

exports.initializeRoutes = () => router;