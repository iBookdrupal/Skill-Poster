const express = require('express');
const routes = require('./routes/routes');
const middleware = require('./routes/middleware/middleware');
const errors = require('./routes/errors/errors');

const app = express();

app.set('view engine', 'ejs');

//* Default Layout
app.set('layout', './layouts/layout');

app.use(middleware);
app.use(routes);
app.use(errors);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
