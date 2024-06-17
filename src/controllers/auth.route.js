const express = require('express');
const router = express.Router();
const userRepository = require('../models/user-repository');
const { passwordsAreEqual } = require('../security/crypto');
const { generateAuthToken } = require('../security/auth');
const { body } = require('express-validator');

const { validateBody } = require('./validation/route.validator');

router.post('/login', body('login_user').notEmpty(), body('mdp_user').notEmpty(), async (req, res) => {

    const { login_user, mdp_user } = req.body;
    console.log("login_user");
    console.log(login_user);
    const user = await userRepository.getUserByLogin(login_user);
    console.log("user");
    console.log(user);
    if (!user || !(user && passwordsAreEqual(mdp_user, user.mdp_user))) {
        res.status(401).send('Unauthorized');

        return;
    }

    const token = generateAuthToken(user.id_user, user.label_user);

    res.status(200).json({ token });
});

exports.initializeRoutes = () => router;