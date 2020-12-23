const connection = require('../db/connection')

exports.fetchUserByUsername = async (username) => {
    const user = await connection
        .select('*')
        .from('users')
        .where('username', '=', username)
    return user[0]
}