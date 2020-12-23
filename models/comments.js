const connection = require('../db/connection')

exports.fetchCommentsByArticleID = async (article_id, order, sort_by) => {
    const comments = await connection
        .select('*')
        .from('comments')
        .where({ article_id })
        .orderBy(sort_by || 'created_at', order || 'desc')
    return comments;
}