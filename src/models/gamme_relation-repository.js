const uuid = require('uuid');
const GammeRelation  = require('./gamme_relation.model');

exports.getGammeRelations = async () => {
    return await GammeRelation.findAll();
}

exports.getGammeRelationParent = async (id_gamme_parent) => {
    return await GammeRelation.findAll({where : {id_gamme_parent}});
}

exports.getGammeRelationEnfant = async (id_gamme_enfant) => {
    return await GammeRelation.findAll({where : {id_gamme_enfant}});
}

exports.createGammeRelation = async (body) => {
    const machine = body;
    machine.id_machine = uuid.v4();
    await GammeRelation.create(machine);
};

exports.updateGammeRelation = async (id_gamme_parent, data) => {
    const foundGammeRelation = await GammeRelation.findOne({ where: { id_gamme_parent } });

    if (!foundGammeRelation) {
        throw new Error('Pas de user');
    }

    await GammeRelation.update(
        {
            id_gamme_enfant: data.id_gamme_enfant || foundGammeRelation.id_gamme_enfant,
        },
        { where: { id_gamme_parent } },
    );
};


exports.deleteGammeRelation = async (id_gamme_parent) => {
    await GammeRelation.destroy({ where: { id_gamme_parent } });
};