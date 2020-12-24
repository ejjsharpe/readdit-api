const apiRouter = require('express').Router()
const articlesRouter = require('./articles');
const topicsRouter = require('./topics')
const usersRouter = require('./users')
const commentsRouter = require('./comments')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/comments', commentsRouter)

module.exports = apiRouter;