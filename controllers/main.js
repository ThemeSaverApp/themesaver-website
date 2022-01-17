homePage = (req, res, next) => {
    res.render('homepage')
}

aboutPage = (req, res, next) => {
    res.render('aboutpage')
}


installPage = (req, res, next) => {
    res.render('installpage')
}

module.exports = {homePage, aboutPage, installPage}