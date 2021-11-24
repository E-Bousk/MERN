// "router" fera référence à l'objet ROUTER d'EXPRESS
const router = require('express').Router();

// configure 'authController' : on appelle le fichier "auth.controller" du dossier "../controllers"
const authController = require('../controllers/auth.controller');

// configure 'userController' : on appelle le fichier "user.controller" du dossier "../controllers"
const userController = require('../controllers/user.Controller');


// ***************************************************
// ********************* AUTH ************************
// ***************************************************

// ***************************
// *****  CREATE  USER   *****
// ***************************
// Methode POST pour ajouter un utilisateur
// donc « URL_de_l'appli/api/user/register » amène vers la fonction "signUp" de "auth.controller"
router.post("/register", authController.signUp);



// ***************************************************
// ******************* USER DB ***********************
// ***************************************************

// ***************************
// *****   READ  USER    *****
// ***************************

// ///////////////////////////
// // TOUS les utilisateurs //
// ///////////////////////////
// Quand méthode GET sur l'URI '/', exécute la fonction 'getAllUsers' (qui est dans 'user.Controller')
router.get('/', userController.getAllUsers);

// ///////////////////////////
// //  UN seul utilisateur  //
// ///////////////////////////
// Quand méhode GET sur l'URI '/:id', exécute la fonction 'userInfo' (qui est dans 'user.controller')
// « :id » est un paramètre (req.param)
router.get('/:id', userController.userInfo);



// ***************************
// *****  UPDATE  USER   *****
// ***************************
// Quand méthode PUT sur l'URI '/:id', exécute la fonction 'updateUser' (qui est dans 'user.controller')
router.put('/:id', userController.updateUser);


// ***************************
// *****  DELETE  USER   *****
// ***************************
// Quand méthode DELETE sur l'URI '/:id', exécute la fonction 'deleteUser' (qui est dans 'user.controller')
router.delete('/:id', userController.deleteUser);





// Rendre disponible le router dans toute l'application
module.exports = router;