const mongoose = require('mongoose');

// On appelle la fonction "isEmail" de la bibliothèque "validator" 
const { isEmail } = require('validator');

// On appelle la bibliothèque BCRYPT
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
    pseudo: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 55,
      unique: true,
      trim: true          // Supprime les blancs, tabulations et espaces inutiles en début et fin de chaîne
    },
    email: {
      type: String,
      required: true,
      validate: [isEmail],
      lowercase: true,
      trim: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      max: 1024,
      minLength: 6
    },
    picture: {
      type: String,
      default: "./upload/profil/default-user.png"
    },
    bio: {
      type: String,
      max: 1024
    },
    followers: {
      type: [String]     // tableau de string
    },
    following: {
      type: [String]
    },
    likes: {
      type: [String]
    }
  },
  {
    timestamps: true
  }
);

// On execute cette fonction avant de sauvegarder dans la BDD
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


// On exporte le USERMODEL (la table = user / le schema = userSchema)
const UserModel = mongoose.model('user', userSchema);
module.exports = UserModel;
