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
var addStaffRouter = require('./routes/staff/add-staff');
var mostRatedLecturersRouter = require('./routes/sidebar/most-rated-lecturers');
var mostRatedTutorsRouter = require('./routes/sidebar/most-rated-tutors');
var highestRatedLecturersRouter = require('./routes/sidebar/highest-rated-lecturers');
var highestRatedTutorsRouter = require('./routes/sidebar/highest-rated-tutors');

var app = express();

mongoose.connect('mongodb+srv://Realify:Clement200@cluster0.ek03mcz.mongodb.net/all_collections?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// view engine setup
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
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/login', loginRouter);
app.use('/api/signup', signupRouter);
app.use('/api/verify-login', verifyLoginRouter);
app.use('/api/add-staff', addStaffRouter);
app.use('/api/highest-rated-lecturers', highestRatedLecturersRouter);
app.use('/api/highest-rated-tutors', highestRatedTutorsRouter);
app.use('/api/most-rated-lecturers', mostRatedLecturersRouter);
app.use('/api/most-rated-tutors', mostRatedTutorsRouter);

// passport.use(
//   new LocalStrategy(async (username, password, done) => {
//     try {
//       const user = await User.findOne({ username: username });
//       if (!user) {
//         return done(null, false, { message: "Incorrect username" });
//       };
//       const match = await bcrypt.compare(password, user.password);
//       if (!match) {
//         return done(null, false, { message: "Incorrect password" });
//       };
//       return done(null, user);
//     } catch(err) {
//       return done(err);
//     };
//   })
// );

// passport.serializeUser((user, done) => {
//   done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//   try {
//     const user = await User.findById(id);
//     done(null, user);
//   } catch(err) {
//     done(err);
//   };
// });

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
