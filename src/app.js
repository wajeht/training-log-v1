/* eslint-disable no-undef */
const express = require('express');

const app = express();

// util
const path = require('path');
const flash = require('connect-flash');
const multer = require('multer');
const compression = require('compression');

// to protect session
const csrf = require('csurf');
const csrfProtechtion = csrf();

// security
const helmet = require('helmet');

// session
const session = require('express-session');
const pgSession = require('connect-pg-simple')(session);
const config = require('../config/config.js');
const pgPool = require('../config/database.js');

// routes
const indexRouter = require('./routes/indexRouter.js');
// const userRouter = require('./routes/userRouter.js');
const adminRouter = require('./routes/adminRouter.js');
const authRouter = require('./routes/authRouter.js');
const errorController = require('./controllers/errorController.js');

// html/ejs templatation engine
app.set('view engine', 'ejs');
app.set('views', './src/views');

// multer file stuff
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png|gif|mp4|mov|mpeg/;
  const mimetype = fileTypes.test(file.mimetype);
  const extname = fileTypes.test(path.extname(file.originalname));
  if (mimetype && extname) {
    return cb(null, true);
  } else {
    cb(null, false);
  }
};

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'data/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${new Date().toISOString()}-${file.originalname}`);
  },
});

// to serve public files and
// parse user input
app.use(express.static(path.join(__dirname, 'public')));
app.use('/data/uploads', express.static('data/uploads'));

app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(
  multer({
    fileFilter: fileFilter,
    storage: fileStorage,
    limits: {
      // 10 MB
      fileSize: 20 * 1024 * 1024,
    },
  }).fields([
    { name: 'video', maxCount: 1 },
    { name: 'picture', maxCount: 1 },
  ])
);

// security to hide all headers info
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// auth err message
app.use(flash());

// session store
app.use(
  session({
    store: new pgSession({
      pool: pgPool,
      tableName: 'session',
    }),
    secret: config.cookie.secret,
    resave: false,
    saveUninitialized: false,
  })
);

// csrf on all POST request
// usually pass it from view for security
// so bad guys can't use our session store
app.use(csrfProtechtion);
app.use((req, res, next) => {
  // const token = req.csrfToken();
  // res.cookie('XSRF-TOKEN', token);
  // res.locals._csrf = token;

  res.locals.csrfToken = req.csrfToken();
  res.locals.isAuthenticated = req.session.isLoggedIn;
  next();
});

// routes
app.use(compression());
app.use(indexRouter);
app.use(authRouter);
app.use(adminRouter);
app.use(errorController.get500);
app.use(errorController.get404);

module.exports = app;
