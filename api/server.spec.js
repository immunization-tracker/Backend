const db = require('../data/dbConfig.js');
const supertest = require('supertest');
const server = require('./server');

describe('API', () => {
    it('should set environment to testing', () => {
        expect(process.env.DB_ENV).toBe('testing');
      });

    describe('server', () => {
        describe('GET /', () => {
            it('responds with 200 stat', () => {
                return supertest(server)
                .get('/')
                .expect(200);
            })
            it('response contains API is running', () => {
                return supertest(server)
                .get('/')
                .expect('<h1> API is running!!! </h1>')

            })
        })
    })

})
