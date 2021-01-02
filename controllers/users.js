const { fetchUserByUsername, insertUser, fetchUsers } = require('../models/users')

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

exports.postNewUser = async (req, res, next) => {
    try {
        const user = await insertUser(req.body)
        res.status(201).send({ user })
    } catch (err) {
        next(err)
    }
}

exports.getUsers = async (req, res, next) => {
    try {
        const users = await fetchUsers()
        res.status(200).send({ users })
    } catch (err) {
        next(err)
    }
}