const express = require('express');
const router = express.Router();
const posteOperationMachine = require('../models/operation_machine-repository');

router.get('/', async (req, res) => {
    res.send(await posteOperationMachine.getOperationMachines());
});

router.get('/listMachine/:id_operation', async (req, res) => {
    const foundAllMachine = await posteOperationMachine.getOperationMachineById(req.params.id_operation);

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

router.get('/listOperation/:id_machine', async (req, res) => {
    const foundAllOperation = await posteOperationMachine.getMachinePosteById(req.params.id_machine);

    if (foundAllOperation) {
        res.status(200).send(foundAllOperation);
        return;
    }
    if (!foundAllOperation) {
        const foundAllOperation = null;
        res.status(500).send('Operation not found');
        return ;
    }
    res.send(foundAllOperation);
});

router.get('/Unassigned/:id_operation', async (req, res) => {
    try {
        const foundUnassignedListeMachine = await posteOperationMachine.getUnassignedListeOperationMachineById(req.params.id_operation);

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
            await posteOperationMachine.createOperationMachine(req.body);
            res.status(201).send({ message: "Relation Operation/Machine créée avec succès" });
        } catch (e){
            res.status(500).send(e)
        }

    },
);
router.delete('/:id_operation_machine', async (req, res) => {
    await posteOperationMachine.deleteOperationMachine(req.params.id_operation_machine);
    res.status(204).end();
});

exports.initializeRoutes = () => router;