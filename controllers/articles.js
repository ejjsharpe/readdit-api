const { fetchArticles, fetchArticleByID, updateArticleByID, eraseArticleByID } = require('../models/articles')


exports.getArticles = async (req, res, next) => {
    try {
        const articles = await fetchArticles()
        res.status(200).send({ articles })
    } catch (err) {
        next(err)
    }
}

exports.getArticleByID = async (req, res, next) => {
    const articleID = req.params.article_id
    try {
        const article = await fetchArticleByID(articleID)
        res.status(200).send({ article })
    } catch (err) {
        next(err)
    }
}

exports.patchArticleByID = async (req, res, next) => {
    const articleID = req.params.article_id;
    const { inc_votes } = req.body;
    try {
        const article = await updateArticleByID(articleID, inc_votes)
        res.status(202).send({ article })
    } catch (err) {
        next(err)
    }
};

exports.deleteArticleByID = async (req, res, next) => {
    const articleID = req.params.article_id
    try {
        const msg = await eraseArticleByID(articleID)
        res.status(202).send({ msg })
    } catch (err) {
        next(err)
    }
}
