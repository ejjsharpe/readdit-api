const articlesRouter = require('express').Router()
const { getArticles, getArticleByID, patchArticleByID, deleteArticleByID, postArticle } = require('../controllers/articles')
const { getCommentsByArticleID, postCommentByArticleID } = require('../controllers/comments')

articlesRouter.route('/')
    .get(getArticles)
    .post(postArticle)

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)
    .delete(deleteArticleByID)

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleID)
    .post(postCommentByArticleID)



module.exports = articlesRouter;