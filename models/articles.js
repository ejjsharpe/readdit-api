const connection = require('../db/connection')

exports.fetchArticles = () => {
    return connection
        .select('*')
        .from('articles')
        .then(articlesRows => {
            if (articlesRows.length === 0) {
                return Promise.reject({ status: 404, msg: 'Not found' })
            }
            return articlesRows
        })
}