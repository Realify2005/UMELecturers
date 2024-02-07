var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const LocalStrategy = require('passport-local').Strategy;
const flash = require('express-flash');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/auth/login');
var signupRouter = require('./routes/auth/signup');
var verifyLoginRouter = require('./routes/verify-login');
var addStaffRouter = require('./routes/staff/add-staff-data');
var getStaffDataRouter = require('./routes/staff/get-staff-data');
var editStaffDataRouter = require('./routes/staff/edit-staff-data');
var getUserDataRouter = require('./routes/user/get-user-data');

var app = express();

mongoose.connect('mongodb+srv://Realify:Clement200@cluster0.ek03mcz.mongodb.net/all_collections?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(cors());
app.use(logger('dev'));
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(flash());
app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/verify-login', verifyLoginRouter);
app.use('/api/add-staff-data', addStaffRouter);
app.use('/api/get-staff-data', getStaffDataRouter)
app.use('/api/edit-staff-data', editStaffDataRouter);
app.use('/api/get-user-data', getUserDataRouter)

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
