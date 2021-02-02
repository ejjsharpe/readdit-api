
exports.up = function (knex) {
    return knex.schema.createTable('articles', (articles) => {
        articles.increments('article_id').primary();
        articles.text('title');
        articles.text('body');
        articles.integer('votes').defaultTo(0);
        articles.text('topic').references('topics.slug');
        articles.timestamp('created_at').notNullable();
        articles.text('author').references('users.username');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('articles');
};