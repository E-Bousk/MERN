// On appelle notre modèle USER
const UserModel = require('../models/user.model');

// On déclare et on exporte la fonction "signUp"
// Dans la REQuest (ce qui est envoyé lorsque l'on fait un POST à signUP (/api/user/register))
// il y a des informations qui transitent (le pseudo, l'email et le mot de passe)
module.exports.signUp = async (req, res) => {
  // console.log('req => ', req.body);
  const {pseudo, email, password} = req.body; // On déstructure, c'est à dire : « pseudo » à la place de « req.body.pseudo » etc...

  try {
    // Création de l'utilisateur (avec 3 éléments obligatoires)
    const user = await UserModel.create({pseudo, email, password});
    // Si OK : réponse => on renvoie l'ID de l'utilisateur
    res.status(201).json({ user: user._id });
  }
  catch(err) { // si il y a un problème, on CATCH : on récupère l'erreur en paramètre
    // réponse classique en renvoyant l'erreur dans la console
    res.status(200).send({ err });
  };
};