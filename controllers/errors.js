exports.handleCustomErrors = (err, req, res, next) => {
    if (err.status === 404) {
        return res.status(404).send(err)
    } else next(err)
}

exports.handlePSQLErrors = (err, req, res, next) => {
    if (err.code == '22P02' || '42703') {
        return res.status(400).send({ msg: 'Bad request' })
    } else next(err)
}

exports.handle500 = (err, req, res, next) => {
    console.log(err)
    res.status(500).send({ msg: 'Internal server error' })
}

exports.routeNotFound = (req, res) => {
    res.status(404).send({ msg: 'Route not found' });
};

exports.methodNotAllowed = (req, res) => {
    res.status(405).send({ msg: 'Method not allowed' });
};