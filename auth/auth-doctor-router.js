const router= require('express').Router()
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secrets = require('../config/secrets')
const Users= require('../users/users-model.js');

router.post('/staff/register', (req, res) => {
    let user = req.body
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash;

    Users.addDoctor(user)
        .then(saved => {
            console.log(saved)
            res.status(201).json(saved)
        })
        .catch(err => {
            res.status(500).json({message: "Error registring In", err: err.toString() }) 
        })
})

router.post('/staff/login', (req, res) => {
    const {username , password } = req.body;

    Users.findBy({ username })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)){
                const token = generateToken(user)

                res.status(200).json({
                    message: `Welcome ${user.username}`,
                    token,
                })
            } else {
                res.status(401).json({ message: `Can't find your information` })
            }
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

function generateToken(user){
    const payload = {
        id: user.id,
        username: user.username
    }
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options  )
}

module.exports = router;