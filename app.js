const express = require('express');
const app = express();

// util
const path = require('path');

// routes
const indexRouter = require('./routes/indexRouter.js');
const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const errorController = require('./controllers/errorController.js');
const bodyParser = require('body-parser');

// html
app.set('view engine', 'ejs');
app.set('views', 'views');

// middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(indexRouter);
app.use(adminRouter);
app.use(errorController.get404);

module.exports = app;
