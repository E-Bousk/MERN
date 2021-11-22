// On déclare MONGOOSE
const mongoose = require('mongoose');

// On l'appelle et on utilise la méthode CONNECT pour se connecter à la BDD
mongoose
	.connect(
		"mongodb+srv://" + process.env.DB_USER_PASS + "@clustermongodb.xa7ac.mongodb.net/mern-project", 
		{
			useNewUrlParser: true,
			useUnifiedTopology: true
		}
	)
	.then(() => console.log("Connected to MongoDB"))
	.catch((err) => console.log("Failed to connect to MongoDB", err));