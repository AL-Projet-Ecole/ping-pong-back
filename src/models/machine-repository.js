const uuid = require('uuid');
const Machine = require('./machine.model');

exports.getMachines = async () => {
    return await Machine.findAll({order: [['updatedAt', 'DESC']]});
}

exports.getMachineById = async (id_machine) => {
    return await Machine.findOne({where : {id_machine}});
}

exports.createMachine = async (body) => {
    const machine = body;
    machine.id_machine = uuid.v4();
    await Machine.create(machine);
};

exports.updateMachine = async (id_machine, data) => {
    const foundMachine = await Machine.findOne({ where: { id_machine } });

    if (!foundMachine) {
        throw new Error('Pas de user');
    }

    await Machine.update(
        {
            libelle_machine: data.libelle_machine || foundMachine.libelle_machine
        },
        { where: { id_machine } },
    );
};

exports.deleteMachine = async (id_machine) => {
    try {
        await Machine.destroy({ where: { id_machine } });
    } catch (error) {
        throw error;
    }
};