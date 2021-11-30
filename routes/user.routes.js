const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const userController = require('../controllers/user.Controller');
const uploadController = require('../controllers/upload.Controller');
// Multer est un middleware pour la gestion « multipart/form-data »
// qui est principalement utilisé pour télécharger des fichiers.
const multer = require('multer');
const upload = multer();

// *** AUTH ***
router.post('/register', authController.signUp);
router.post('/login', authController.signIn);
router.get('/logout', authController.signOut);

// *** USER DB ***
router.get('/', userController.getAllUsers);
router.get('/:id', userController.userInfo);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.patch('/follow/:id', userController.follow);
router.patch('/unfollow/:id', userController.unfollow);

// *** UPLOAD ***
// On passe par le middleware "multer" (= "upload")
router.post('/upload', upload.single('file'), uploadController.uploadProfil);

module.exports = router;
