const uuid = require('uuid');
const Gamme = require('./gamme.model');

exports.getGammes = async () => {
    return await Gamme.findAll({order: [['updatedAt', 'DESC']]});
}

exports.getGammeByTitre = async (titre_gamme) => {
    return await Gamme.findOne({where : {titre_gamme}});
}

exports.getGammeById = async (id_gamme) => {
    return await Gamme.findOne({where : {id_gamme}},{order: [['updatedAt', 'DESC']]});
}

exports.getGammeByType = async (type_gamme) => {
    return await Gamme.findAll({where : {type_gamme}});
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
            titre_gamme: data.titre_gamme || foundGamme.titre_gamme,
            description_gamme: data.description_gamme || foundGamme.description_gamme,
            prix_gamme: data.prix_gamme || foundGamme.prix_gamme,
            provenance_gamme: data.provenance_gamme || foundGamme.provenance_gamme,
            type_gamme: data.type_gamme || foundGamme.type_gamme,
            stock_gamme: data.stock_gamme || foundGamme.stock_gamme,
        },
        { where: { id_gamme } },
    );
};


exports.deleteGamme = async (id_gamme) => {
    try {
        await Gamme.destroy({ where: { id_gamme } });
    } catch (error) {
        throw error;
    }
};
