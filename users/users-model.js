const db = require('../data/dbConfig.js')

module.exports = {
    findBy, findById, addDoctor, listAllUsers
}

function listAllUsers() {
    return db('doctors').select('id', 'username')
}

//LOGIN by finding first

function findBy(param) {
    return db('doctors').where(param)
}


//REGISTER

async function addDoctor(user) {
    const [id] = await db('doctors').insert(user)
    return findById(id)
}

function findById(id){
    return db('doctors')
    .where({ id })
    .first();
}