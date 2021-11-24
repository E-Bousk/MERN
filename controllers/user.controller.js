// On appelle la BDD
const UserModel = require('../models/user.model');

// On recupère ObjectID pour faire des vérifications/contrôle d'IDs
const ObjectID = require('mongoose').Types.ObjectId; 



// ***************************
// *****   READ  USER    *****
// ***************************

// ///////////////////////////
// // TOUS les utilisateurs //
// ///////////////////////////
// On exporte la fonction "getAllUsers" (pour la récuperer dans 'user.routes')
module.exports.getAllUsers = async (req, res) => {
  // On va chercher la table qui correspond à 'userModel'
  // ``tu vas trouver (find()) et tu prends tout (select())``
  // Si on ne veut pas le mot de passe => select('-password')
  const users = await UserModel.find().select('-password');
  // Ce résultat (contenu dans 'users') est transmit en JSON avec un code 200
  res.status(200).json(users);
};

// ///////////////////////////
// //  UN seul utilisateur  //
// ///////////////////////////
// On export la fonction "userInfo"
module.exports.userInfo = async (req, res) => {
  // « req.params » correspond aux paramètres mis dans l'URL
  // console.log('req.params => ', req.params);
  // console.log('req.params.id => ', req.params.id);
  // On verifie si l'ID récupéré en paramètre de la route est valide (et connu dans la BDD ?)
  if (!ObjectID.isValid(req.params.id))
    // S'il n'est pas bon, on retourne un statut 400 avec message
    return res.status(400).send('ID invalid : ' + req.params.id);
  
  // S'il est bon, on cherche dans la BDD avec l'ID passé
  // 1er paramètre = erreur / 2ème paramètre = data ('docs')
  UserModel.findById(req.params.id, (err, docs) => {
    // Si aucune erreur, on envoie les data
    if (!err) res.send(docs);
    // Sinon, console log avec message
    else console.log('ID unknown : ' + err);
  // et si tu envoies les données de l'utilisateur, on ne veux pas le mot de passe  
  }).select('-password');
};



// ***************************
// *****  UPDATE  USER   *****
// ***************************
module.exports.updateUser = async (req, res) => {
  // console.log('req.params => ', req.params);
  // console.log('req.params.id => ', req.params.id);
  // l' ID est invalide
  if (!ObjectID.isValid(req.params.id))
    // statut 400
    return res.status(400).send('ID invalid : ' + req.params.id);

  // l'ID est valide
  try {
    // On prend le 'userModel'
    // await UserModel.findOneAndUpdate( // AWAIT enlevé sinon erreur code: 'ERR_HTTP_HEADERS_SENT'
    UserModel.findOneAndUpdate(
      // On lui passe l'ID de l'utilisateur que l'on veut éditer
      {_id: req.params.id},
      {
        // On set la BIO
        $set: {
          bio: req.body.bio
        }
      },
      { new: true, upsert: true, setDefaultsOnInsert: true},
      // Dans le callback: soit il y a une ERReur soit on a tous les DOCS (data)
      (err, docs) => {
        // pas d'erreur : on envoit les data --> on inscrit la 'bio' dans la BDD 
        if(!err) return res.send(docs);
        // erreur : status 500 et message erreur
        if (err) return res.status(500).send({message: err});
      }
    );
  } catch (err) {
    res.status(500).json({message: err});
  };
};



// ***************************
// *****  DELETE  USER   *****
// ***************************
module.exports.deleteUser = async (req, res) => {
  // l' ID est invalide
  if (!ObjectID.isValid(req.params.id))
  // statut 400
  return res.status(400).send('ID invalid : ' + req.params.id);

  try {
    // On passe l'ID en paramètre de REMOVE
    await UserModel.remove({ _id: req.params.id }).exec();
    // On envoie un message de succès
    res.status(200).json({ message: "Successfully deleted. "});
  } catch (err) {
    // En cas d'erreur : message et status 500
    res.status(500).json({message: err});
  };
};