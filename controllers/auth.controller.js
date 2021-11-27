// On appelle notre modèle USER
const UserModel = require('../models/user.model');

// On appelle la bibliothèque "Json web token"
const jwt = require('jsonwebtoken');

// On définit la durée de vie du token
const maxAge = 3 * 24 * 60 * 60 * 1000; // 3jours (en millisecondes)

// On crée la fonction "createToken" pour générer un token
const createToken = (id) => {
  // 1er paramètre : l'ID de l'utilisateur
  // 2eme paramètre : clef secrète (stocké dans ".env") pour décodé le token
  // 3eme paramètre : expiration
  return jwt.sign({id}, process.env.TOKEN_SECRET,{
    expiresIn: maxAge
  });
};

// ***************************
// *****  CREATE  USER   *****
// ***************************
// On déclare et on exporte la fonction "signUp"
// Dans la REQuest (ce qui est envoyé lorsque l'on fait un POST à signUP (/api/user/register))
// il y a des informations qui transitent (le pseudo, l'email et le mot de passe)
module.exports.signUp = async (req, res) => {
  // « req.body » correspond aux données passées dans des inputs
  // console.log('req.body => ', req.body);
  const {pseudo, email, password} = req.body; // On déstructure, c'est à dire : « pseudo » à la place de « req.body.pseudo » etc...

  try {
    // Création de l'utilisateur (avec 3 éléments obligatoires)
    const user = await UserModel.create({ pseudo, email, password });
    // Si OK : réponse => on renvoie l'ID de l'utilisateur
    res.status(201).json({ user: user._id });
  }
  catch(err) { // si il y a un problème, on CATCH : on récupère l'erreur en paramètre
    // réponse classique en renvoyant l'erreur dans la console
    res.status(200).send({ err });
  };
};


// ***************************
// *****     LOGIN       *****
// ***************************
// On déclare et on exporte la fonction "signIn"
module.exports.signIn = async (req, res) => {
  const { email, password } = req.body; // destructuring (ie: email = req.body.email, etc...)

  try {
    // On vérifie dans la BDD. Si existe, on récupère et on stock tout dans la variable "user"
    const user = await UserModel.login(email, password);
    // On crée un token (avec JWT) en passant 'user' que l'on vient de récupérer
    const token = createToken(user._id);
    // On crée un cookie pour y mettre le token
    // 1er paramètre : nom du cookie
    // 2eme paramètre : le token
    // 3eme paramètre : caractèristiques
    // 'HTTPONLY' = consultable que par notre serveur
    // 'MAXAGE' = durée de vie (variable définie plus haut)
    res.cookie('jwt', token, { httpOnly: true, maxAge });
    // On génère une réponse pour dire que ça reussit
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(200).json(err);
  };
};

// ***************************
// *****     LOGOUT      *****
// ***************************
module.exports.signOut = (req, res) => {
  // On détruit le (cookie) token :
  // 1er argument : son nom
  // 2eme argument : string vide
  // 3eme argument : durée de vie (réglé à une milliseconde)
  res.cookie('jwt', '', { maxAge: 1 });
  // NOTE : On fait une redirection, sinon la requête n'aboutit pas (dans POSTMAN)
  res.redirect('/');
};