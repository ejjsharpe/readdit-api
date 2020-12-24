const { fetchCommentsByArticleID, insertCommentByArticleID, updateCommentById, eraseCommentByID } = require('../models/comments')

exports.getCommentsByArticleID = async (req, res, next) => {
    const { article_id } = req.params;
    const { order, sort_by } = req.query;
    try {
        const comments = await fetchCommentsByArticleID(article_id, order, sort_by)
        res.status(200).send({ comments })
    } catch (err) {
        next(err)
    }
}

exports.postCommentByArticleID = async (req, res, next) => {
    const { article_id } = req.params;
    const { username, body } = req.body
    try {
        const comment = await insertCommentByArticleID({ article_id, author: username, body })
        res.status(201).send({ comment })
    } catch (err) {
        next(err)
    }
}

exports.patchCommentByID = async (req, res, next) => {
    const { comment_id } = req.params;
    const { inc_votes } = req.body;
    try {
        const comment = await updateCommentById(comment_id, inc_votes);
        res.status(202).send({ comment });
    } catch (err) {
        next(err)
    }
};

exports.deleteCommentByID = async (req, res, next) => {
    try {
        const { comment_id } = req.params;
        await eraseCommentByID(comment_id);
        res.status(204).send({})
    } catch (err) {
        next(err)
    }
};
