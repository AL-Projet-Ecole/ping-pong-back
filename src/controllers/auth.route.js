const express = require('express');
const userRepository = require('../models/user-repository');
const { passwordsAreEqual } = require('../security/crypto');
const { generateAuthToken } = require('../security/auth');
const { body } = require('express-validator');
const { validateBody } = require('./validation/route.validator');
const router = express.Router();

router.post('/login', body('login_user').notEmpty(), body('mdp_user').notEmpty(), async (req, res) => {
    const { login_user, mdp_user } = req.body;
    const user = await userRepository.getUserByLogin(login_user);

    if (!user || !passwordsAreEqual(mdp_user, user.mdp_user)) {
        return res.status(401).send('Unauthorized');
    }

    const token = generateAuthToken(user.id_user, user.label_user, user.role_user);

    res.status(200).json({ token });
});

exports.initializeRoutes = () => router;