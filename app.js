const express = require('express');
const app = express();

// util
const path = require('path');
const config = require('./config/config.js');

// session
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const pgPool = require('./config/database.js');

// routes
const indexRouter = require('./routes/indexRouter.js');
// const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const authRouter = require('./routes/authRouter.js');
const errorController = require('./controllers/errorController.js');

// html
app.set('view engine', 'ejs');
app.set('views', 'views');

// session store
app.use(
    session({
        store: new pgSession({
            pool: pgPool,
            tableName: 'session',
        }),
        secret: config.cookie.secret,
        proxy: true,
        resave: true,
        saveUninitialized: true,
    })
);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(indexRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(errorController.get404);

module.exports = app;
