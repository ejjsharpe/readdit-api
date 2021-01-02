const apiRouter = require('express').Router()
const articlesRouter = require('./articles');
const topicsRouter = require('./topics')
const usersRouter = require('./users')
const commentsRouter = require('./comments')
const { methodNotAllowed } = require('../controllers/errors')
const endpoints = require('../api.json')


apiRouter.route('/')
    .get((req, res) => res.status(200).send(endpoints))
    .all(methodNotAllowed);

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter;