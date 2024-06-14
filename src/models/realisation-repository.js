const uuid = require('uuid');
const Realisation = require('./realisation.model');

exports.getRealisations = async () => {
    return await Realisation.findAll();
}

exports.getRealisationById = async (id_realisation) => {
    return await Realisation.findOne({where : {id_realisation}});
}

exports.createRealisation = async (body) => {
    const realisation = body;
    realisation.id_realisation = uuid.v4();
    await Realisation.create(realisation);
};

exports.deleteRealisation = async (id_realisation) => {
    await Realisation.destroy({ where: { id_realisation } });
};