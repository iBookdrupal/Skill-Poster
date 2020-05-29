const express = require('express');
const router = express.Router();
router.use((req, res) => {
  res.status(404);
  //res.send('Page Not found');

  res.render('./errors/404', {
    layout: './layouts/error',
    title: 'Error 404',
    message: 'Opps, The Page you are looking for might have been removed or are you missing a directory?',
    author: 'Webmaster',
  });
});

router.use((req, res) => {
  res.status(500);
  //res.send('Page Not found');

  res.render('./errors/500', {
    layout: './layouts/error',
    title: 'Error 500',
    message: 'Internal Server Error! \n Sorry server is either sleeping but your request is notified',
    author: 'Webmaster',
  });
});

module.exports = router;
