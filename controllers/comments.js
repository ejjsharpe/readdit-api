const { fetchCommentsByArticleID, insertCommentByArticleID } = require('../models/comments')

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
