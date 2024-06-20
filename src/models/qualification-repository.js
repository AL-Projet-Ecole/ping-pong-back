const uuid = require('uuid');
const Qualification = require('./qualification.model');

exports.getQualifications = async () => {
    return await Qualification.findAll();
}

exports.getUsersQualifiedForPoste = async (id_poste) => {
    return await Qualification.findAll({where : {id_poste}});
}

exports.getPostesByUser = async (id_user) => {
    return await Qualification.findAll({where : {id_user}});
}

exports.createQualification = async (body) => {
    const qualification = body;
    qualification.id_qualification = uuid.v4();
    await Qualification.create(qualification);
};

exports.deleteQualification = async (id_qualification) => {
    await Qualification.destroy({ where: { id_qualification } });
};