const connection = require('../db/connection')

exports.fetchArticles = async () => {
    const articlesRows = await connection
        .select('*')
        .from('articles')

    if (articlesRows.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not found' })
    }
    return articlesRows
}

exports.fetchArticleByID = async (articleID) => {
    const article = await connection
        .select('articles.*')
        .from('articles')
        .where('articles.article_id', '=', articleID)
        .leftJoin('comments', 'comments.article_id', '=', 'articles.article_id')
        .groupBy('articles.article_id')
        .count('comment_id AS comment_count')

    if (article.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not found' })
    }
    return article[0];
}

exports.updateArticleByID = async (article_id, inc_votes) => {
    const article = await connection
        .select('*')
        .from('articles')
        .where({ article_id })
        .increment('votes', inc_votes || 0)
        .returning('*');
    return article[0];
}

exports.eraseArticleByID = async (articleID) => {
    const title = await connection
        .from('articles')
        .where('article_id', '=', articleID)
        .delete('*')
        .returning('title')
    if (title.length === 0) {
        return Promise.reject({ status: 404, msg: 'Not found' })
    }
    return `"${title[0]}" was deleted`
}