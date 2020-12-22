
exports.up = function (knex) {
    return knex.schema.createTable('users', (users) => {
        users.text('username').primary().unique();
        users.text('avatar_url');
        users.text('name');
    })
};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};
