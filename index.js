require('dotenv').config()

// Express Imports
const express = require('express');
const methodOverride = require('method-override')
const path = require('path')
const app = express();

const mongoose = require('mongoose')
const ejsMate = require('ejs-mate')
const flash = require('connect-flash')
const session = require('express-session')

// Routes
const main = require('./routes/main')
const users = require('./routes/users')
const rice = require('./routes/rice')

// Passport Imports
const passport = require('passport')
const LocalStrategy = require('passport-local')
const User = require('./models/user')

const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");

// Security Stuff
const helmet = require("helmet");
const mongoSanitize = require('express-mongo-sanitize');

// Utils
const expressError = require('./utils/catchAsync');

// Setting up livereload
const liveReloadServer = livereload.createServer({extraExts: ['ejs']}); 
liveReloadServer.watch([__dirname + "/public", __dirname + "/views"]);

dbUrl = process.env.dbUrl

// Connecting mongoose to mongodb
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("MONGO CONNECTION OPEN!!!")
    })
    .catch(err => {
        console.log("OH NO MONGO CONNECTION ERROR!!!!")
        console.log(err)
    })

// Express Configuration
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
app.engine('ejs', ejsMate)
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.use(connectLiveReload());
app.use(helmet({
    crossOriginEmbedderPolicy: false,
    crossOriginOpenerPolicy: false,
    crossOriginResourcePolicy: false,
}))
app.use(
    helmet.contentSecurityPolicy({
      useDefaults: true,
      directives: {
        defaultSrc : ["'self'", "http://localhost:35729", "https://github.com/"],
        "connect-src": ["http://localhost:35729", "ws://localhost:35729", "https://github.com/"],
        "img-src": ["'self'", "https: data:", "https://github.com/"],
        scriptSrc: ["'self'", "'unsafe-inline'" , "http://localhost:35729/"]
      }
    })
  )


app.use(mongoSanitize());


// Session/Cookies Config
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig))
app.use(flash());

// Setting Up Passport
app.use(passport.initialize())
app.use(passport.session()) 

app.use((req, res, next) => {
    // console.log(req.originalUrl)
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


app.use('/', main)
app.use('/', users)
app.use('/', rice)

app.all('*', (req, res, next) => {
    next(new expressError('No Page Like That', 404))
})

// Error Middleware
app.use((err, req, res, next) => {
    const {message = 'error', statusCode = '404'} = err;
    res.status(statusCode)
    console.log(err.stack)
    res.send(message)
})

// Starting Express Server at port 3001
app.listen(3001, () => {
    console.log('Listening At Port 3001')
})