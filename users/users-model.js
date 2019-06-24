const db = require('../data/dbConfig.js')

module.exports = {
    findBy, 
    findById,
     addDoctor, 
     listAllDoctors, 
     getDoctorsPatients
}

function listAllDoctors() {
    return db('doctors').select('id', 'username', 'name')
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

function getDoctorsPatients(id){
    return db('doctors as d')
    .join('records as r', 'r.doctor_id', 'd.id' )
    .select('d.name', 'r.patient_name', '' )
}