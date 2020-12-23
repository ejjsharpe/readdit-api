const apiRouter = require('express').Router()
const articlesRouter = require('./articles');
const topicsRouter = require('./topics')
const usersRouter = require('./users')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)

module.exports = apiRouter;