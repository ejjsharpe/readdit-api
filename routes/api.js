const apiRouter = require('express').Router()
const articlesRouter = require('./articles');
const topicsRouter = require('./topics')

apiRouter.use('/topics', topicsRouter)
apiRouter.use('/articles', articlesRouter)

module.exports = apiRouter;