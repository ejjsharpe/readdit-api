const commentsRouter = require('express').Router()
const { patchCommentByID, deleteCommentByID } = require('../controllers/comments')
const { methodNotAllowed } = require('../controllers/errors')

commentsRouter.route('/:comment_id')
    .patch(patchCommentByID)
    .delete(deleteCommentByID)
    .all(methodNotAllowed);

module.exports = commentsRouter;
