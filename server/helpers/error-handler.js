const errorHandler = function (err, req, res, next) {
    if (typeof(err) === 'string') {
        return res.status(400).send({
            status: 'error',
            message: err.message,
            data: null,
        });
    }

    if (err.name === 'ValidationError') {
        return res.status(400).send({
            status: 'error',
            message: err.message,
            data: null,
        });
    }

    if (err.name === 'UnauthorizedError') {
        return res.status(401).send({
            status: 'error',
            message: err.message,
            data: null,
        });
    }

    return res.status(500).send({
        status: 'error',
        message: err.message,
        data: null,
    });
};

module.exports = errorHandler;