const express = require('express');
const router = express.Router();
const machineRepository = require('../models/machine-repository');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await machineRepository.getMachines());
});

router.get('/:nom_user', async (req, res) => {
    const foundMachine = await machineRepository.getMachineById(req.params.id_machine);

    if (foundMachine) {
        res.status(200).send([foundMachine]);
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
            if (req.body.libelle_machine.length > 8 ){
                await machineRepository.createMachine(req.body);
                res.status(201).end();
            }
            else {
                res.status(412).send("Le titre n'est pas assé long ! !")
            }
        } catch (e){
            res.status(411).send(e)
        }

    },
);


router.put('/:id_machine', async (req, res) => {
    await machineRepository.updateMachine(req.params.id_machine, req.body).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
});

router.delete('/:id_machine', async (req, res) => {
    await machineRepository.deleteMachine(req.params.id_machine);
    res.status(204).end();
});

exports.initializeRoutes = () => router;