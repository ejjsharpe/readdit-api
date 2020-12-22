const articlesRouter = require('express').Router()
const { getArticles, getArticleByID, patchArticleByID, deleteArticleByID } = require('../controllers/articles')

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)
    .delete(deleteArticleByID)



module.exports = articlesRouter;