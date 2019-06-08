const jwt = require('jsonwebtoken');

const validateUser = function (req, res, next) {
    jwt.verify(req.headers['x-access-token'], 'secret', function(err, decoded) {
        if (err) {
            res.send({
                status: 'error',
                message: err.message,
                data: null,
            });
        } else {
            req.body.userId = decoded.id;

            next();
        }
    });
};

module.exports = validateUser;