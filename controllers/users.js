const User = require('../models/user')
const passport = require('passport')
const GitHubStrategy = require('passport-github2').Strategy;

// Setting up passport github authentication

passport.use(new GitHubStrategy({
    clientID: process.env.clientID,
    clientSecret: process.env.clientSecret,
    callbackURL: "https://themesaver.herokuapp.com/auth/github/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    const doesUserExit = await User.exists({ 'githubID':  profile.id});
    console.log(doesUserExit)
    if (doesUserExit !== true) {
        const user = new User({'githubID': profile.id, 'username': profile.username})
        await user.save()
    }
    done(null, profile)
  }
));


passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

loginPage = (req, res, next) => {
    // res.send(req.url)
    res.redirect('/auth/github')
}

loginUser = (req, res, next) => {
    console.log('Logged In')
    res.redirect('/')
}

logout = (req, res, next) => {
    req.logout()
    res.redirect('/')
}

module.exports = {loginPage, loginUser, logout}
