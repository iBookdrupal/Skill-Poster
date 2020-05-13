const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');

//* Database
const db = require('./config/database');

//* Test DB
db.authenticate()
  .then(() => console.log('Database Connected...'))
  .catch((err) => console.log('Error: ' + err));

const app = express();

//* ejs
app.set('view engine', 'ejs');
app.use(expressLayouts);

//* Set Static folder
app.use(express.static('public'));

//? Default Layout
app.set('layout', './layouts/layout');

//* Index route
app.get('/', (req, res) => {
  res.render('index', {layout: './layouts/landing'});
});

//* body - parser
app.use(bodyParser.urlencoded({extended: false}));

//* Gig routes
app.use('/gigs', require('./routes/gigs'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
