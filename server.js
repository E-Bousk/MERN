// On charge le Framework EXPRESS
const express = require('express');

// On charge la bibiothèque "cookie parser"
const cookieParser = require('cookie-parser');

// On appelle le fichier './routes/user.routes'
const userRoutes = require('./routes/user.routes');

// Recupère le fichier « .env »
require('dotenv').config({ path: './config/.env' });

// On charge le fichier d'accès à la BDD
require('./config/db');

// On appelle les fonctions "checkUser" et "requireAuth" du fichier "auth.middleware"
const { checkUser, requireAuth } = require('./middlewares/auth.middleware');

// Quand on appellera « app » cela correspondra à EXPRESS
const app = express();



// ***************************************************
// ******************* MIDDLEWARES *******************
// ***************************************************
// Prend la requête et la met au bon format (JSON) (équivalent à "BODY-PARSER")
// permet de traiter les data qui vont transiter
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// On va pouvoir lire les cookies (avec "req.cookies")
app.use(cookieParser());

// ***************************************************
// *********   MIDDLEWARES JSON WEB TOKEN   *********
// ***************************************************
// À chaque requête GET (toutes les routes (avec « * »)) on déclenche la middleware "checkUser"
// pour vérifier l'utilisateur. On assure ainsi la sécurité/connexion de l'utilisateur
app.get('*', checkUser);

// On utilise la fonction "requireAuth" lors de la requête GET sur la route "/jwtid"
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});



// ***************************************************
// ********************* ROUTES **********************
// ***************************************************
// Quand il y aura la requête « /api/user » on appellera « userRoutes »
app.use('/api/user', userRoutes);



// ***************************************************
// ********************* SERVER **********************
// ***************************************************
// Ouvre le serveur sur le port définit dans le fichier « .env »
// et affiche dans la console un message avec le port en question
app.listen(process.env.PORT, () => {
  // Déclenche un 'callback' qui sera un console.log
  console.log(`Listening on port ${process.env.PORT}`);
});