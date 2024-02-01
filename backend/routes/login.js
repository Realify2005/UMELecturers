const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');

const router = express.Router();

router.post('/', (req, res, next) => {

  passport.authenticate("local", (err, user, info) => {
    if (!user) {
      return res.status(401).json({ message: info });
    }
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    return res.status(200).json({ user });
  })(req, res, next);


});

module.exports = router;
