const uuid = require('uuid');
const Gamme = require('./gamme.model');

exports.getGammes = async () => {
    return await Gamme.findAll();
}

exports.getGammeById = async (nom_user) => {
    return await Gamme.findOne({where : {id_gamme}});
}

exports.createGamme = async (body) => {
    const gamme = body;
    gamme.id_gamme = uuid.v4();
    await Gamme.create(gamme);
};

exports.updateGamme = async (id_gamme, data) => {
    const foundGamme = await Gamme.findOne({ where: { id_gamme } });

    if (!foundGamme) {
        throw new Error('Pas de user');
    }

    await Gamme.update(
        {
            libelle_gamme: data.libelle_gamme || foundGamme.libelle_gamme,
            //TODO FAIRE LE TOUT ICI
        },
        { where: { id_gamme } },
    );
};


exports.deleteGamme = async (id_gamme) => {
    await Gamme.destroy({ where: { id_gamme } });
};