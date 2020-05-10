
const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require ('dotenv'); 
dotenv.config ();
const db = process.env.MONGODB_CONNECT

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// pour toutes les requêtes get * on renvoie au client le ficher index.html situé dans le dossier public.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// connection à la base de donnée
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
        .then( () => console.log('connexion db 👍') )
        .catch( err => console.log(err) ); 

module.exports = app; 
