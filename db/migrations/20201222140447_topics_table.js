
exports.up = function (knex) {
    return knex.schema.createTable('topics', (topics) => {
        topics.text('slug').primary();
        topics.text('description');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('topics');
};
