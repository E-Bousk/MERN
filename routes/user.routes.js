// "router" fera référence à l'objet ROUTER d'EXPRESS
const router = require('express').Router();

// configure 'authController' : on appelle la fonction "controller" du fichier "auth.controller" du dossier "../controllers"
const authController = require('../controllers/auth.controller');

// Methode POST pour ajouter un utilisateur
// donc « URL_de_l'appli/api/user/register » amène vers la fonction "signUp" de "auth.controller"
router.post("/register", authController.signUp);

// Rendre disponible le router dans notre application
module.exports = router;