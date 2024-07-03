const uuid = require('uuid');
const { Op } = require('sequelize');
const ListeOperation = require('./liste_operation.model');
const Operation = require('./operation.model');

exports.getListeOperations = async () => {
    return await ListeOperation.findAll();
}

exports.getListeOperationById = async (id_gamme) => {
    return await ListeOperation.findAll({ where: { id_gamme } });
}

exports.getUnassignedListeOperationById = async (id_gamme) => {
    const assignedOperations = await ListeOperation.findAll({
        where: { id_gamme },
        attributes: ['id_operation']
    });

    const assignedOperationIds = assignedOperations.map(op => op.id_operation);

    return await Operation.findAll({
        where: {
            id_operation: {
                [Op.notIn]: assignedOperationIds
            }
        }
    });
};

exports.createListeOperation = async (body) => {
    body.id_liste_operation = uuid.v4();
    await ListeOperation.create(body);
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