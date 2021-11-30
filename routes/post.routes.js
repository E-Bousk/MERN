const router = require('express').Router();
const postController = require('../controllers/post.controller');
// Multer est un middleware pour la gestion « multipart/form-data »
// qui est principalement utilisé pour télécharger des fichiers.
const multer = require('multer');
const upload = multer();

// Posts
router.get('/', postController.readPost);
// On va maintenant envoyer une image dans le POST (req.file en plus du req.body)
// Cette image doit donc transiter par "multer"
router.post('/', upload.single('file'), postController.createPost);
router.put('/:id', postController.updatePost);
router.delete('/:id', postController.deletePost);
router.patch('/like-post/:id', postController.likePost);
router.patch('/unlike-post/:id', postController.unlikePost);

// Comments
router.patch('/comment-post/:id', postController.commentPost);
router.patch('/edit-comment-post/:id', postController.editCommentPost);
router.patch('/delete-comment-post/:id', postController.deleteCommentPost);


module.exports = router;