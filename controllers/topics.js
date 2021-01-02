const { fetchTopics, insertTopic } = require('../models/topics.js')


exports.getTopics = async (req, res, next) => {
    const topics = await fetchTopics()
    try {
        res.status(200).send({ topics })
    } catch (err) {
        next(err)
    }
}

exports.postTopic = async (req, res, next) => {
    try {
        const topic = await insertTopic(req.body)
        res.status(201).send({ topic });
    } catch (err) {
        next(err)
    }

}