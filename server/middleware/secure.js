//Go middleware som kollar om sessionen har en användare?
function secure(req, res, next) {
    if (req.session.user) {
        return next();
    }
    res.status(401).json("You must login");
}

module.exports = secure;