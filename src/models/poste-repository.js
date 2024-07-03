const uuid = require('uuid');
const Poste = require('./poste.model');

exports.getPostes = async () => {
    return await Poste.findAll(
        {order: [['updatedAt', 'DESC']]}
    );
}

exports.getPosteById = async (id_poste) => {
    return await Poste.findOne({where : {id_poste}});
}

exports.getPosteByLibelle = async (libelle_poste) => {
    return await Poste.findOne({where : {libelle_poste}});
}

exports.createPoste = async (body) => {
    const poste = body;
    poste.id_poste = uuid.v4();
    await Poste.create(poste);
};

exports.updatePoste = async (id_poste, data) => {
    const foundPoste = await Poste.findOne({ where: { id_poste } });

    if (!foundPoste) {
        throw new Error('Pas de poste');
    }

    await Poste.update(
        {
            libelle_poste: data.libelle_poste || foundPoste.libelle_poste,
        },
        { where: { id_poste } },
    );
};

exports.deletePoste = async (id_poste) => {
    try {
        await Poste.destroy({ where: { id_poste } });
    } catch (error) {
        throw error;
    }
};