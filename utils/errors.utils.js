// ***************************
// *****  REGISTRATION   *****
// ***************************
module.exports.signUpErrors = (err) => {
  // on crée un objet vide, qu'on remplira suivant l'erreur trouvée et qu'on retournera
  // (les erreurs seront là où les valeurs seront remplies)
  let errors = { pseudo: '', email: '', password: '' };

  if (err.message.includes('pseudo')) errors.pseudo = 'Pseudo incorrect';

  if (err.message.includes('email')) errors.email = 'Email incorrect';

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('pseudo'))
    errors.pseudo = 'Ce pseudo est déjà utilisé';

  if (err.code === 11000 && Object.keys(err.keyValue)[0].includes('email'))
    errors.email = 'Cet Email est déjà utilisé';

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe doit comporter au moins 6 caractères';

  // on retoure la variable et on verifira quelle(s) valeur(s) est(sont) remplie(s)
  // pour savoir où est(sont) l'(les) erreur(s)
  return errors;
};

// ***************************
// *****     LOGIN       *****
// ***************************
module.exports.signInErrors = (err) => {
  let errors = { email: '', password: '' };

  if (err.message.includes('email')) errors.email = 'Email inconnu';

  if (err.message.includes('password'))
    errors.password = 'Le mot de passe ne correspond pas';

  return errors;
};

// ***************************
// *****     UPLOAD      *****
// ***************************
module.exports.uploadErrors = (err) => {
  let errors = { format: '', maxSize: '' };

  if (err.message.includes('Invalid file'))
    errors.format = "Ce format de fichier n'est pas autorisé";

  if (err.message.includes('Max size'))
    errors.maxSize = 'La taille du fichier dépasse le maximum autorisé (500 ko)';

  return errors;
};
