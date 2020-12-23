const { fetchUserByUsername } = require('../models/users')

exports.getUserByUsername = async (req, res, next) => {
    const { username } = req.params
    try {
        const user = await fetchUserByUsername(username)
        if (user) res.status(200).send({ user })
        else res.status(404).send({ msg: 'Not found' })
    } catch (err) {
        next(err)
    }
} 