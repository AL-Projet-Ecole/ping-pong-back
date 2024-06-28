const uuid = require('uuid');
const PosteMachine = require('./poste_machine.model');
const Machine = require("./machine.model");
const {Op} = require("sequelize");

exports.getPosteMachines = async () => {
    return await PosteMachine.findAll();
}

exports.getPosteMachineById = async (id_poste) => {
    return await PosteMachine.findAll({where : {id_poste}});
}

exports.getMachinePosteById = async (id_machine) => {
    return await PosteMachine.findAll({where : {id_machine}});
}

exports.getUnassignedListePosteMachineById = async (id_poste) => {
    const assignedMachines = await PosteMachine.findAll({
        where: { id_poste },
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

exports.createPosteMachine = async (body) => {
    const posteMachine = body;
    posteMachine.id_poste_machine = uuid.v4();
    await PosteMachine.create(posteMachine);
};

exports.updateListeOperation = async (id_liste_operation, data) => {
    const foundListeOperation = await ListeOperation.findOne({ where: { id_liste_operation } });

    if (!foundListeOperation) {
        throw new Error('Pas de user');
    }

    await ListeOperation.update(
        {
            id_gamme: data.id_gamme || foundListeOperation.id_gamme,
            id_operation: data.id_operation || foundListeOperation.id_operation,
            id_user: data.id_user || foundListeOperation.id_user,
        },
        { where: { id_liste_operation } },
    );
};


exports.deletePosteMachine = async (id_poste_machine) => {
    await PosteMachine.destroy({ where: { id_poste_machine } });
};