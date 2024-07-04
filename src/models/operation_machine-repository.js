const uuid = require('uuid');
const OperationMachine = require('./operation_machine.model');
const Machine = require("./machine.model");
const {Op} = require("sequelize");

exports.getOperationMachines = async () => {
    return await OperationMachine.findAll();
}

exports.getOperationMachineById = async (id_operation) => {
    return await OperationMachine.findAll({where : {id_operation}});
}

exports.getMachineOperationById = async (id_machine) => {
    return await OperationMachine.findAll({where : {id_machine}});
}

exports.getUnassignedListeOperationMachineById = async (id_operation) => {
    const assignedMachines = await OperationMachine.findAll({
        where: { id_operation },
        attributes: ['id_machine']
    });

    const assignedMachinesIds = assignedMachines.map(machine => machine.id_machine);

    return await Machine.findAll({
        where: {
            id_machine: {
                [Op.notIn]: assignedMachinesIds
            }
        }
    });
};

exports.createOperationMachine = async (body) => {
    const operationMachine = body;
    operationMachine.id_operation_machine = uuid.v4();
    await OperationMachine.create(operationMachine);
};



exports.deleteOperationMachine = async (id_operation_machine) => {
    await OperationMachine.destroy({ where: { id_operation_machine } });
};