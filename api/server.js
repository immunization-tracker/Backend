const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const server = express()

const authDocRouter = require('../auth/auth-doctor-router');

server.use(express.json());
server.use(helmet());
server.use(cors());

server.get('/', (req, res) => {
    res.send('<h1> API is running!!! </h1>')
})

server.use('/api/', authDocRouter);



module.exports = server;

