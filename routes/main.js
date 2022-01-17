const express = require('express')

const main = require('../controllers/main')

router = express.Router()

router.get('/', main.homePage)
router.get('/about', main.aboutPage)
router.get('/install', main.installPage)

router.get('/error', (req, res, next) => {
    res.render('error', {err: 'Error Stach Goes Here'})
})

module.exports = router