exports.handleCustomErrors = (err, req, res, next) => {
    console.log(err)
    if (err.status === 404) {
        return res.status(404).send(err)
    } else {
        next(err)
    }
}