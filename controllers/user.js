const User = require('../models/user');

function index(req,res) {
    if (!req.user) {
        res.redirect('/')
    }
    res.render('profile', { user: req.user })
}

module.exports = {
    index,
}