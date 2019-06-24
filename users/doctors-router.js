const router = require('express').Router()

const Doctors = require('./users-model')
const restricted = require('../auth/restricted-mdw.js')


router.get('/doctors', restricted, ( req, res) => {
    Doctors
    .listAllDoctors()
    .then(doctors => {
        res.json(doctors)
    })
    .catch(err => {
        res.status(500).json({ message: 'Cannot be found' })
    })
})

router.get('/records', restricted, ( req, res) => {
    Doctors
    .getAllRecords()
    .then(records => {
        res.json(records)
    })
    .catch(err => {
        res.status(500).json({ message: 'Cannot be found' })
    })
})

router.get('/:doctor_id/records', restricted, (req, res) => {
    
    const { doctor_id } = req.params;
    
    Doctors
    .getDoctorRecords(doctor_id)
    .then(records => {
        res.status(200).json(records)
    })
    .catch(err => {
        res.status(500).json({ message: 'Cannot be found', err})
    })

})

router.post('/records', restricted, (req, res) => {

    const { patient_name, DOB, doctor_id } = req.body

    Doctors
    .addRecord({ patient_name, DOB, doctor_id})
    .then(record => {
        res.status(201).json({message:'Record successfully made', record})
    })
    .catch(err => {
        res.status(500).json({ message: 'Cannot be done', err})
    })
})

router.put('/:id/records', restricted, (req, res) => {
    
    const { id } = req.params
    const { patient_name, patient_id, DOB } = req.body
    Doctors
    .updateRecord(id, { patient_name, patient_id, DOB})
    .then(record => {
        res.status(200).json({message: 'Successfully updated!', record})
    })
    .catch(err => {
        res.status(500).json({ message: 'Cannot be done', err})
    })
})

router.delete('/:id/records', restricted, (req, res) => {
    const { id } = req.params
    Doctors
    .deleteRecord(id)
    .then(record => {
        res.status(200).json({message: 'Successfully deleted!'})
    })
    .catch(err => {
        res.status(500).json({ message: 'Cannot be done', err})
    })
})

module.exports = router;