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
            label_user: data.label_user || foundRealisation.label_user,
            //TODO FAIRE LE TOUT ICI
        },
        { where: { id_realisation } },
    );
};


exports.deleteUser = async (id_realisation) => {
    await Realisation.destroy({ where: { id_realisation } });
};