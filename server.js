const express = require('express');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require('dotenv').config({ path: './config/.env' });
require('./config/db');
const { checkUser, requireAuth } = require('./middlewares/auth.middleware');
const cors = require('cors');

const app = express();

const corsOptions = {
  // Seul "CLIENT_URL" sera autorisé à faire des requêtes sur notre API
  origin: process.env.CLIENT_URL,
  Credential: true,
  allowedHeaders: ['sessionId', 'Content-Type'],
  exposedHeaders: ['sessionId'],
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
};
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// *** jwt ***
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
  res.status(200).send(res.locals.user._id);
});

// *** ROUTES ***
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

// *** SERVER ***
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
