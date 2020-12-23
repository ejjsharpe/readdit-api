const articlesRouter = require('express').Router()
const { getArticles, getArticleByID, patchArticleByID, deleteArticleByID } = require('../controllers/articles')
const { getCommentsByArticleID } = require('../controllers/comments')

articlesRouter.route('/')
    .get(getArticles)

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)
    .delete(deleteArticleByID)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleID)



module.exports = articlesRouter;