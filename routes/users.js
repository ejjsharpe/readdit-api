const usersRouter = require('express').Router()
const { getUserByUsername, postNewUser, getUsers } = require('../controllers/users')
const {methodNotAllowed} = require('../controllers/errors')


usersRouter.route('/')
    .post(postNewUser)
    .get(getUsers)
    .all(methodNotAllowed);

usersRouter.route('/:username')
    .get(getUserByUsername)
    .all(methodNotAllowed);

module.exports = usersRouter;