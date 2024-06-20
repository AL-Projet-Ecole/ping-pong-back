const uuid = require('uuid');
const ListeOperation = require('./liste_operation.model');

exports.getListeOperations = async () => {
    return await ListeOperation.findAll();
}

exports.getListeOperationById = async (id_liste_operation) => {
    return await ListeOperation.findOne({where : {id_liste_operation}});
}

exports.createListeOperation = async (body) => {
    const machine = body;
    machine.id_machine = uuid.v4();
    await ListeOperation.create(machine);
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


exports.deleteListeOperation = async (id_liste_operation) => {
    await ListeOperation.destroy({ where: { id_liste_operation } });
};