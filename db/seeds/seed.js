const {
    topicData,
    articleData,
    commentData,
    userData,
} = require('../data/index.js');

const {
    convertTimestamps,
    createArticleReference,
    formatComments

} = require('../../utils/data-manipulation')

exports.seed = async knex => {
    //rolling back previous migrations and migrating to latest
    await knex.migrate.rollback();
    await knex.migrate.latest();

    //inserting topics and users data
    const topicsPromise = knex('topics').insert(topicData, '*');
    const usersPromise = knex('users').insert(userData, '*');
    await Promise.all([topicsPromise, usersPromise]);

    //formatting and inserting articles data
    const formattedArticleData = convertTimestamps(articleData);
    const articleRows = await knex('articles').insert(formattedArticleData, '*');

    //formatting and inserting comments data
    const articleIdLookup = createArticleReference(articleRows);
    const convertedTimestampComments = convertTimestamps(commentData)
    const formattedCommentData = formatComments(convertedTimestampComments, articleIdLookup);
    return knex('comments').insert(formattedCommentData);
}