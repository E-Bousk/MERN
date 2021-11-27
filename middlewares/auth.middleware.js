const jwt = require('jsonwebtoken');
const UserModel = require('../models/user.model');



// ********************************************
// *** Tester si l'utilisateur est connecté ***
// **   (On vérifie si le token est connu)   **
// ********************************************
// ‼ C'est un middleware : on doit poursuivre le code après son exécution
// Il faut donc un "next" ‼
module.exports.checkUser = (req, res, next) => {
  // 'req.cookies" permet d'accèder aux cookies
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // "res.locals.user" sont les infos qui transitent
        res.locals.user = null;
        res.cookie('jwt', '', { maxAge: 1 });
        next();
      } else {
        // console.log("decodedToken => ", decodedToken);
        let user = await UserModel.findById(decodedToken.id);
        res.locals.user = user;
        // console.log("user => ", user);
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};


// ********************************************
// ***  Pour la première authentification   ***
// ********************************************
module.exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decodedToken) => {
      if (err) {
        // Ici on ne fait pas de "next()", donc on arrête le code ici
        console.log(err);
      } else {
        console.log(decodedToken.id);
        next();
      }
    });
  } else {
    console.log('No token');
  }
};