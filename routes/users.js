const express = require('express')

const users = require('../controllers/users')

const passport = require('passport')

router = express.Router()

router.route('/login')
    .get(users.loginPage)

router.get('/logout', users.logout)    

router.get('/auth/github',
  passport.authenticate('github'));

router.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/register', failureFlash: 'Unable To Log In', successFlash: 'Successfully Logged In'  }),
  function(req, res) {
    res.redirect('/'); 
  });


module.exports = router