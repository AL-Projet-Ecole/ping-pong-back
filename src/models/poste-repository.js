const uuid = require('uuid');
const Poste = require('./poste.model');

exports.getPostes = async () => {
    return await Poste.findAll();
}

exports.getPosteById = async (nom_user) => {
    return await Poste.findOne({where : {id_poste}});
}

exports.createPoste = async (body) => {
    const poste = body;
    poste.id_poste = uuid.v4();
    await Poste.create(poste);
};

exports.updatePoste = async (id_poste, data) => {
    const foundPoste = await Poste.findOne({ where: { id_poste } });

    if (!foundPoste) {
        throw new Error('Pas de user');
    }

    await Poste.update(
        {
            libelle_poste: data.libelle_poste || foundPoste.libelle_poste,
            //TODO FAIRE LE TOUT ICI
        },
        { where: { id_poste } },
    );
};


exports.deletePost = async (id_poste) => {
    await Poste.destroy({ where: { id_poste } });
};