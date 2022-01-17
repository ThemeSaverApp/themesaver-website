module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch((err) => {
            res.render('error', { err })
            next(err)
        }
        );
    }
}