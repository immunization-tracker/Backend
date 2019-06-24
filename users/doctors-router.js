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

module.exports = router;