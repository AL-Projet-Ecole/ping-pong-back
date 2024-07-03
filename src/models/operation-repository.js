const uuid = require('uuid');
const Operation = require('./operation.model');
const Poste = require("./poste.model");

exports.getOperations = async () => {
    return await Operation.findAll();
}

exports.getOperationById = async (id_operation) => {
    return await Operation.findOne({where : {id_operation}});
}

exports.createOperation = async (body) => {
    try {
        const operation = body;
        operation.id_operation = uuid.v4();
        await Operation.create(operation);
    } catch (error) {
        throw error;
    }
};


exports.updateOperation = async (id_operation, data) => {
    const foundOperation = await Operation.findOne({ where: { id_operation } });

    if (!foundOperation) {
        throw new Error('Pas de donnée trouvé pour les operations');
    }

    await Operation.update(
        {
            id_machine: data.id_machine || foundOperation.id_machine,
            libelle_operation: data.libelle_operation || foundOperation.libelle_operation,
            temps_estimation: data.temps_estimation || foundOperation.temps_estimation,
        },
        { where: { id_operation } },
    );
};

exports.deleteOperation = async (id_operation) => {
    try {
        await Operation.destroy({ where: { id_operation } });
    } catch (error) {
        throw error;
    }
};