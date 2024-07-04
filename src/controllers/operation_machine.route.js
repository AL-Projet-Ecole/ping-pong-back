const express = require('express');
const router = express.Router();
const operationMachineRepository = require('../models/operation_machine-repository');
const Machine = require('../models/machine.model');
const Operation = require('../models/operation.model');

router.get('/', async (req, res) => {
    res.send(await operationMachineRepository.getOperationMachines());
});

router.get('/listMachine/:id_operation', async (req, res) => {
    const foundAllMachine = await operationMachineRepository.getOperationMachineById(req.params.id_operation);

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
    const foundAllOperation = await operationMachineRepository.getMachineOperationById(req.params.id_machine);

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
        const foundUnassignedListeMachine = await operationMachineRepository.getUnassignedListeOperationMachineById(req.params.id_operation);

        if (foundUnassignedListeMachine) {
            res.status(200).send(foundUnassignedListeMachine);
        } else {
            res.status(404).send('Operation not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

router.post('/', async (req, res) => {
    try {
        const { id_operation, id_machine } = req.body;


        const operation = await Operation.findByPk(id_operation);
        const machine = await Machine.findByPk(id_machine);

        if (!operation) {
            return res.status(400).send({ message: 'Operation ID does not exist in the operations table.' });
        }

        if (!machine) {
            return res.status(400).send({ message: 'Machine ID does not exist in the machines table.' });
        }

        await operationMachineRepository.createOperationMachine(req.body);
        res.status(201).send({ message: 'Relation Operation/Machine créée avec succès' });
    } catch (e) {
        res.status(500).send(e);
    }
});
router.delete('/:id_operation_machine', async (req, res) => {
    await operationMachineRepository.deleteOperationMachine(req.params.id_operation_machine);
    res.status(204).end();
});

exports.initializeRoutes = () => router;