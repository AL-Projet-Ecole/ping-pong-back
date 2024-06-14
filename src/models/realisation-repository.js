const uuid = require('uuid');
const Realisation = require('./realisation.model');

exports.getUsers = async () => {
    return await Realisation.findAll();
}

exports.getUserById = async (nom_user) => {
    return await Realisation.findOne({where : {id_realisation}});
}

exports.createUser = async (body) => {
    const realisation = body;
    realisation.id_realisation = uuid.v4();
    await Realisation.create(realisation);
};

exports.updateRealisation = async (id_realisation, data) => {
    const foundRealisation = await Realisation.findOne({ where: { id_realisation } });

    if (!foundRealisation) {
        throw new Error('Pas de user');
    }

    await Realisation.update(
        {
            id_user: data.id_user || foundRealisation.id_user,
            id_poste: data.id_poste || foundRealisation.id_poste,
            id_machine: data.id_user || foundRealisation.id_machine,
            temps_realisation: data.temps_realisation || foundRealisation.temps_realisation,
        },
        { where: { id_realisation } },
    );
};


exports.deleteUser = async (id_realisation) => {
    await Realisation.destroy({ where: { id_realisation } });
};