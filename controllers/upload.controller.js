const UserModel = require('../models/user.model');
const fs = require('fs');

// On contruit "promisify" depuis "util"
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);

// On importe notre fonction pour gérer les erreurs sur les uploads
const { uploadErrors } = require('../utils/errors.utils');

module.exports.uploadProfil = async (req, res) => {
  try {
    if (
      req.file.detectedMimeType !== 'image/jpg' &&
      req.file.detectedMimeType !== 'image/jpg' &&
      req.file.detectedMimeType !== 'image/jpeg'
    )
      throw Error('Invalid file');

    if (req.file.size > 500000) throw Error('Max size');
  } catch (err) {
    // On appelle notre fonction "uploadErrors" pour gérer les erreurs
    const errors = uploadErrors(err);
    return res.status(201).json({ errors });
  }

  const fileName = req.body.name + '.jpg';

  // Pipeline permet de créer le fichier (via FileSystem)
  await pipeline(
    req.file.stream,
    fs.createWriteStream(`${__dirname}/../client/public/uploads/profil/${fileName}`)
  );

  try {
    await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: './uploads/profil/' + fileName,
        },
      },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    )
      .then((docs) => res.status(200).send(docs))
      .catch((err) => res.status(400).send({ message: err }));
  } catch (err) {
    return res.status(500).send({ message: err });
  }
};
