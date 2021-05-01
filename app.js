const express = require('express');
const app = express();

// util
const path = require('path');
const session = require('express');

// routes
const indexRouter = require('./routes/indexRouter.js');
// const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const authRouter = require('./routes/authRouter.js');
const errorController = require('./controllers/errorController.js');

// html
app.set('view engine', 'ejs');
app.set('views', 'views');

// middlewares
app.use(
    session({
        secret: 'my secret',
        resave: false,
        saveUninitialized: false,
    })
);
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(errorController.get404);

module.exports = app;
