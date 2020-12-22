exports.convertTimestamps = (articlesArray) => {
    return articlesArray.map(({ created_at, ...otherProps }) => {
        const editedArticle = {
            ...otherProps,
            created_at: new Date(created_at).toDateString()
        }
        return editedArticle;
    })
};

exports.createArticleReference = (articles) => {
    const reference = {};
    articles.forEach((article) => {
        reference[article.title] = article.article_id;
    });
    return reference;
}

exports.formatComments = (comments, idLookup) => {
    return comments.map(({ created_by, belongs_to, ...restOfComment }) => {
        const article_id = idLookup[belongs_to];
        return { article_id, author: created_by, ...restOfComment };
    });
};