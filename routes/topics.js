const topicsRouter = require('express').Router()
const { getTopics, postTopic } = require('../controllers/topics')
const {methodNotAllowed} = require('../controllers/errors')

topicsRouter.route('/')
    .get(getTopics)
    .post(postTopic)
    .all(methodNotAllowed);


module.exports = topicsRouter