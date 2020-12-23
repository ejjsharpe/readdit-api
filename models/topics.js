const connection = require('../db/connection')

exports.fetchTopics = async () => {
    const topicsRows = await connection
        .select('*')
        .from('topics')
    return topicsRows
}