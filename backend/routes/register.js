const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const User = require('../models/register');

const registerRouter = express.Router();

registerRouter.post('/register', (req, res) => {
  const today = new Date();
  const userData = {
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    created: today
  }

  User.findOne({
    email: req.body.email
  })
    .then(user => {
      if (!user) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          userData.password = hash
          const newUser = new User(userData);
          newUser.save()
            .then(user => {
              res.json({ status: user.email + ' registered!' })
            })
            .catch(err => {
              res.send('error: ' + err)
            })
        })
      } else {
        res.json({ error: ' user already exists' })
      }
    })
    .catch(err => {
      res.send('error: ' + err)
    })
})

module.exports = registerRouter;
