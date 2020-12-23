const { fetchCommentsByArticleID } = require('../models/comments')

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
