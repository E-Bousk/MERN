// On charge le Framework EXPRESS
const express = require('express');

// On appelle le fichier './routes/user.routes'
const userRoutes = require('./routes/user.routes');

// Recupère le fichier « .env »
require('dotenv').config({path: './config/.env'});

// On charge le fichier d'accès à la BDD
require('./config/db');

// Quand on appellera « app » cela correspondra à EXPRESS
const app = express();

// Prend la requête et la met au bon format (JSON) (équivalent à BODY-PARSER)
// permet de traiter les data qui vont transiter
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ***************************************************
// ******************* MIDDLEWARES *******************
// ***************************************************


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