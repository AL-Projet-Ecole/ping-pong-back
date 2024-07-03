const express = require('express');
const router = express.Router();
const gammeRepository = require('../models/gamme-repository');
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
    res.send(await gammeRepository.getGammes());
});

router.get('/:titre_gamme', async (req, res) => {
    const foundGamme = await gammeRepository.getGammeByTitre(req.params.titre_gamme);

    if (foundGamme) {
        res.status(200).send(foundGamme);
    } else {
        res.status(404).send('Gamme not found');
    }
});

router.get('/id/:id_gamme', async (req, res) => {
    const foundGamme = await gammeRepository.getGammeById(req.params.id_gamme);

    if (foundGamme) {
        res.status(200).send(foundGamme);
    } else {
        res.status(404).send('Gamme not found');
    }
});

router.post(
    '/',
    body('titre_gamme').notEmpty().withMessage('Le titre de la gamme ne peut pas être vide'),
    async (req, res) => {
        // Valider les entrées
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { titre_gamme } = req.body;
        try {
            const gamme = await gammeRepository.getGammeByTitre(titre_gamme);

            if (!gamme) {
                const newGamme = await gammeRepository.createGamme(req.body);
                res.status(201).json(newGamme);
            } else {
                res.status(412).send("Une Gamme a déjà ce titre !");
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    }
);


router.put('/:id_gamme', async (req, res) => {
    try {
        await gammeRepository.updateGamme(req.params.id_gamme, req.body);
        res.status(204).end();
    } catch (err) {
        res.status(500).send(err.message);
    }
});

router.delete('/:id_gamme', async (req, res) => {
    const { id_gamme } = req.params;
    try {
        await gammeRepository.deleteGamme(id_gamme);
        res.status(204).json({ message: 'Gamme supprimée avec succès.' });
    } catch (error) {
        if (error.name === 'SequelizeForeignKeyConstraintError') {
            res.status(400).json({ message: 'Impossible de supprimer cette gamme car elle est référencée par une réalisation.' });
        } else {
            res.status(500).json({ message: 'Erreur serveur.', error: error.message });
        }
    }
});

exports.initializeRoutes = () => router;
