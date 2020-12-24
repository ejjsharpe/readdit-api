const connection = require('../db/connection')

exports.fetchCommentsByArticleID = async (article_id, order, sort_by) => {
    const comments = await connection
        .select('*')
        .from('comments')
        .where({ article_id })
        .orderBy(sort_by || 'created_at', order || 'desc')
    return comments;
}

exports.insertCommentByArticleID = async (comment) => {
    const addedComment = await connection
        .insert(comment)
        .into('comments')
        .returning('*')
    return addedComment[0]
}

exports.updateCommentById = async (comment_id, inc_votes) => {
    const comment = await connection('comments')
        .where({ comment_id })
        .increment('votes', inc_votes || 0)
        .returning('*');
    if (!comment) {
        return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return comment[0];
};

exports.eraseCommentByID = async (comment_id) => {
    const deletedComment = await connection
        .from('comments')
        .where({ comment_id })
        .delete('*')
    if (deletedComment.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not found' })
    }
}