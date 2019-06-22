const db = require('../data/dbConfig.js')

module.exports = {
    findBy, findById, addUser, listAllUsers
}

function listAllUsers() {
    return db('users').select('id', 'username', 'role')
}

//LOGIN by findinding first

function findBy(param) {
    return db('users').where(param)
}


//REGISTER

async function addUser(user) {
    const [id] = await db('users').insert(user)
    return findById(id)
}

function findById(id){
    return db('users')
    .where({ id })
    .first();
}