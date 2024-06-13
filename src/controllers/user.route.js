const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { validateBody } = require('./validation/route.validator');
const { body } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await userRepository.getUsers());
});

router.get('/:nom_user', async (req, res) => {
    const foundUser = await userRepository.getUserByNom(req.params.nom_user);

    if (foundUser) {
        res.status(200).send([foundUser]);
        return;
    }
    if (!foundUser) {
        const foundUser = null;
        res.status(500).send('User not found');
        return ;
    }
    res.send(foundUser);
});
router.post(
    '/',
    body('nom_user').notEmpty(),
    async (req, res) => {
        const {nom_user} = req.body;
        try{
            const user = await userRepository.getUserByNom(nom_user);

            if (!user){
                if (req.body.mdp_user.length > 8 ){
                    await userRepository.createUser(req.body);
                    res.status(201).end();
                }
                else {
                    res.status(412).send("Le mot de passe n'est pas assé long ! !")
                }
            }
            else {
                res.status(412).send("Utilisateur déja utilisé !")
            }
        } catch (e){
            res.status(411).send(e)
        }

    },
);


router.put('/:id_user', async (req, res) => {
    await userRepository.updateUser(req.params.id, req.body).catch((err) => res.status(500).send(err.message));
    res.status(204).end();
});

router.delete('/:id_user', async (req, res) => {
    await userRepository.deleteUser(req.params.id_user);
    res.status(204).end();
});

exports.initializeRoutes = () => router;