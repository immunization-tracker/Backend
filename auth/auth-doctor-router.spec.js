const db = require('../data/dbConfig.js');
const supertest = require('supertest');
const server = require('../api/server.js');

describe('doctors table', () => {
    describe('registering', () => {
        it('testing with registering with existing id', () => {
            return supertest(server)
            .post('/api/staff/register')
            .send({ username: 'hung', password: 'pass' })
            .set('Accept', 'application/json')
            .expect(500);
        })
    })

    describe('log-in testing', () => {
        it('successfully log in', () => {
            return supertest(server)
            .post('/api/staff/login')
            .send({ username: 'hung', password: 'pass'})
            .set('Accept', 'application/json')
            .expect(200);
        })
        it('return 401 if no username found', () => {
            return supertest(server)
            .post('/api/staff/login')
            .send({ username: 'man', password: 'pass'})
            .set('Accept', 'application/json')
            .expect(401);
        })
        it('returns 500 if properties are wrong', () => {
            return supertest(server)
            .post('/api/staff/login')
            .send({ userme: 'man', password: 'pass'})
            .set('Accept', 'application/json')
            .expect(500);
        })
        it('provides token', () => {
            return supertest(server)
            .post('/api/staff/login')
            .send({ username: 'hung', password: 'pass'})
            .set('Accept', 'application/json')
            .then(res => {
                expect(res.body).toHaveProperty('token')
            })
        })
    })
    

})
