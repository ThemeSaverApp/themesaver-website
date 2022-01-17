homePage = (req, res, next) => {
    res.render('homepage', {title: 'Homepage'})
}

aboutPage = (req, res, next) => {
    res.render('aboutpage', {title: 'About'})
}


installPage = (req, res, next) => {
    res.render('installpage', {title: 'Install Instructions'})
}

module.exports = {homePage, aboutPage, installPage}