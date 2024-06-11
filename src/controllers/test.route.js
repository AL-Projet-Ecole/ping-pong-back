const express = require('express');
const router = express.Router();

router.get('/',  (req, res) => {
    res.send("le test de base fonctionne.");
});

exports.initializeRoutes = () => router;