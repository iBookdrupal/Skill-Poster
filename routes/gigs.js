const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Gig = require('../models/Gig');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

//* Get gig list
router.get('/', (req, res) =>
  Gig.findAll()
    .then((codegig) => {
      res.render('./codegigModule/gigs', {
        codegig,
        name: req.user.firstName,
      });
    })
    .catch((err) => console.log(err))
);

//* Display add gig form
router.get('/add', (req, res) => {
  res.render('./codegigModule/add', {
    name: req.user.firstName,
  });
});

//* Add a gig

router.post('/add', (req, res) => {
  let {title, technologies, budget, description} = req.body;
  //Validate Fields
  let errors = [];

  if (!title) {
    errors.push({msg: 'Please fill in title '});
  }

  if (!technologies) {
    errors.push({msg: 'Please fill in some technologies! '});
  }

  if (!description) {
    errors.push({msg: 'Please describe your work! '});
  }

  if (errors.length > 0) {
    res.render('./codegigModule/add', {
      errors,
      title,
      technologies,
      budget,
      description,
    });
  } else {
    //* insert into table
    if (!budget) {
      budget = 'Unknown';
    } else {
      budget = `$${budget}`;
    }

    //* Make lowercase and remove space after comma
    technologies = technologies.toLowerCase().replace(/, /g, ',');

    Gig.sync({force: false})
      .then(() => {
        // Now the `users` table in the database corresponds to the model definition
        Gig.create({
          title,
          technologies,
          budget,
          description,
        });
        return res.redirect('/gigs');
      })
      .catch((err) => console.log(err));
  }
});

//*Search for gigs
router.get('/search', (req, res) => {
  let {term} = req.query;

  term = term.toLowerCase();

  Gig.findAll({where: {technologies: {[Op.like]: '%' + term + '%'}}})
    .then((codegig) =>
      res.render('./codegigModule/gigs', {
        codegig,
        name: req.user.firstName,
      })
    )
    .catch((err) => console.log(err));
});
module.exports = router;
