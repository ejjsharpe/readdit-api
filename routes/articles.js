const articlesRouter = require('express').Router()
const { getArticles, getArticleByID, patchArticleByID, deleteArticleByID, postArticle } = require('../controllers/articles')
const { getCommentsByArticleID, postCommentByArticleID } = require('../controllers/comments')
const { methodNotAllowed } = require('../controllers/errors')

articlesRouter.route('/')
    .get(getArticles)
    .post(postArticle)
    .all(methodNotAllowed);

articlesRouter.route('/:article_id')
    .get(getArticleByID)
    .patch(patchArticleByID)
    .delete(deleteArticleByID)
    .all(methodNotAllowed);

articlesRouter.route('/:article_id/comments')
    .get(getCommentsByArticleID)
    .post(postCommentByArticleID)
    .all(methodNotAllowed);



module.exports = articlesRouter;