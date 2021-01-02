const connection = require('../db/connection')

exports.fetchUserByUsername = async (username) => {
    const user = await connection
        .select('*')
        .from('users')
        .where('username', '=', username)
    return user[0]
}

exports.insertUser = async (userToAdd) => {
    const user = await connection
        .insert(userToAdd)
        .into('users')
        .returning('*')
    return user[0]
}

exports.fetchUsers = async () => {
    const users = await connection
        .select('*')
        .from('users')
    return users;
}