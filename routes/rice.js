const express = require('express')

const rice = require('../controllers/rice')

const passport = require('passport')
const { route } = require('express/lib/application')

router = express.Router()

isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        console.log(req.session.returnTo)
        req.flash('error', 'You need to login first!')
        return res.redirect(req.originalUrl)
    }
    next()
}


router.route('/newRice')
    .get(rice.newRicePage)
    .post(isLoggedIn, rice.createNewRice)

router.get('/shop', rice.shopPage)

router.route('/shop/:id/')
    .get(rice.riceDetails)
    .patch(rice.updateRice)
    .delete(rice.deleteRice)

module.exports = router