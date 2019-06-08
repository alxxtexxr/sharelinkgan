const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Import model
User = require('../models/user');

const UserController = {
    profile: function (req, res, next) {
        User.findOne({username: req.params.username})
            .then(function (user) {
                res.send({
                    status: 'success',
                    message: 'Links fetched succesfully',
                    data: {
                        user: user,
                    },
                });
            }).catch(function (err) {
                next(err);
            });
    },
    userLinks: function (req, res, next) {
        User.findOne({_id: req.body.userId})
            .populate('links')
            .select('links')
            .then(function (data) {
                res.send({
                    status: 'success',
                    message: 'An user fetched succesfully',
                    data: data,
                });
            })
            .catch(function (err) {
                next(err);
            });
    },
    register: function (req, res, next) {
        const reqBody = {
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        }

        User.create(reqBody)
            .then(function (user) {
                const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1h'});

                res.send({
                    status: 'success',
                    message: 'Register success',
                    data: {
                        token: token,
                        user: user,
                    },
                })
            }).catch(function (err) {
                next(err);
            });
    },
    login: function (req, res, next) {
        User.findOne(({email: req.body.email}))
            .then((user) => {
                if (bcrypt.compareSync(req.body.password, user.password)) {
                    const token = jwt.sign({id: user._id}, 'secret', {expiresIn: '1h'});

                    res.send({
                        status: 'success',
                        message: 'Register success',
                        data: {
                            token: token,
                            user: user,
                        },
                    });
                } else {
                    res.send({
                        status: 'error',
                        message: 'Invalid password',
                        data: null,
                    })
                }
            }).catch(function (err) {
                next(err);
            });
    },
};

module.exports = UserController;