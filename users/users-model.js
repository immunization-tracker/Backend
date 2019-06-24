const db = require('../data/dbConfig.js')

module.exports = {
    findBy, 
    findById,
    addDoctor, 
    listAllDoctors, 
    getDoctorRecords,
    addRecord,
    updateRecord,
    deleteRecord
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

function getDoctorRecords(doctor_id) {
   return db('records as r')
    .join('doctors as d', 'd.id','r.doctor_id')
    .select('r.patient_name','r.id as record_id', 'd.username as Doctor', 'r.DOB as DoB' )
    .where('r.doctor_id', doctor_id)
}

function addRecord(record){
    return db('records')
    .insert(record)
    .then(ids => ({ id: ids[0]}));
}

function updateRecord(id, record){
    return db('records')
    .where('id', id)
    .update(record)
    
}
function deleteRecord(id) {
    return db('records')
    .where('id', id)
    .del();
}