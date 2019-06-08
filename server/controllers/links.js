const Link = require('../models/link');

const linkController = {
    index: function (req, res, next) {
        Link.find({})
            .populate({path: 'user', select: 'username'})
            .then(function (links) {
                res.send({
                    status: 'success',
                    message: 'Links fetched succesfully',
                    data: {
                        links: links,
                    },
                });
            }).catch(function (err) {
                next(err);
            });
    },  
    show: function (req, res, next) {
        Link.findOne({_id: req.params.id})
            .populate({path: 'user', select: 'username'})
            .then(function (link) {
                if (link) {
                    res.send({
                        status: 'success',
                        message: 'A link fetched succesfully',
                        data: {
                            link: link,
                        },
                    });
                } else {
                    res.send({
                        status: 'error',
                        message: 'A link not found',
                        data: {
                            link: null,
                        },
                    });
                }
            }).catch(function (err) {
                next(err);
            });
    },
    create: function (req, res, next) {
        const reqBody = {
            url: req.body.url,
            user: req.body.userId,
        };

        Link.create(reqBody)
            .then(function (link) {
                User.findOneAndUpdate({_id: reqBody.user}, {$push: {links: link._id}})
                    .then(function () {
                        res.send({
                            status: 'success',
                            message: 'Link added succesfully',
                            data: {
                                link: link,
                            }
                        });
                    })
                    .catch(function (err) {
                        next(err);
                    });;
            })
            .catch(function (err) {
                next(err);
            });
    },
    update: function (req, res, next) {
        const reqBody = {
            url: req.body.url,
        };

        Link.findOneAndUpdate({_id: req.params.id}, reqBody)
            .then(function (link) {
                if (link) {
                    let outdatedLink = link.toObject();
                    let updatedLink = Object.assign({}, outdatedLink, reqBody);

                    res.send({
                        status: 'success',
                        message: 'A link updated succesfully',
                        data: {
                            outdatedLink: outdatedLink,
                            updatedLink: updatedLink,
                        }
                    });
                } else {
                    res.send({
                        status: 'error',
                        message: 'A link not found',
                        data: {
                            link: null,
                        },
                    });
                }
            })
            .catch(function (err) {
                next(err);
            });
    },
    destroy: function (req, res, next) {
        Link.findOneAndRemove({_id: req.params.id})
            .then(function (link) {
                if(link) {
                    res.send({
                        status: 'success',
                        message: 'A link deleted succesfully',
                        data: {
                            link: link,
                        },
                    });
                } else {
                    res.send({
                        status: 'error',
                        message: 'A link not found',
                        data: {
                            link: null,
                        },
                    });
                }
            })
            .catch(function (err) {
                next(err);
            });
    },
    userLinks: function(req, res, next) {
        Link.find({user: req.body.userId})
            .populate({path: 'user', select: 'username'})
            .then(function (links) {
                res.send({
                    status: 'success',
                    message: 'Links fetched succesfully',
                    data: {
                        links: links,
                    },
                });
            })
            .catch(function (err) {
                next(err);
            });
    }
};

module.exports = linkController;