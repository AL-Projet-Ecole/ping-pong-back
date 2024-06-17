const uuid = require('uuid');
const Operation = require('./operation.model');

exports.getOperations = async () => {
    return await Operation.findAll();
}

exports.getOperationById = async (id_operation) => {
    return await Operation.findOne({where : {id_operation}});
}

exports.createOperation = async (body) => {
    const operation = body;
    operation.id_poste = uuid.v4();
    await Operation.create(operation);
};

exports.updateOperation = async (id_operation, data) => {
    const foundOperation = await Operation.findOne({ where: { id_operation } });

    if (!foundOperation) {
        throw new Error('Pas de poste');
    }

    await Operation.update(
        {
            libelle_operation: data.libelle_operation || foundOperation.libelle_operation,
            //TODO FAIRE LE TOUT ICI
        },
        { where: { libelle_operation } },
    );
};


exports.deleteOperation = async (id_poste) => {
    await Operation.destroy({ where: { id_poste } });
};