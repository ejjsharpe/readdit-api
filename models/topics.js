const { into } = require('../db/connection')
const connection = require('../db/connection')

exports.fetchTopics = async () => {
    const topics = await connection
        .select('*')
        .from('topics')
    return topics
}

exports.insertTopic = async (topicToInsert) => {
    const topic = await connection
        .insert(topicToInsert)
        .into('topics')
        .returning('*')
    return topic[0];
}