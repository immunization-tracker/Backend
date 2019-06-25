const supertest = require('supertest');
const server = require('../api/server.js');
const db = require('../data/dbConfig.js');

let token;

beforeAll((done) => {
    return supertest(server)
    .post('/api/staff/login')
    .send({
        username: 'hung',
        password: 'pass'
    })
    .end((err, res) => {
        token= res.body.token;
        done()
    })
})

describe('after logging in', () => {
    describe('Doctors listing', () => {
        it('GET testing with getting list without token', () =>{
            return supertest(server)
            .get('/api/doctors')
            .expect(400)
        })
        it('GET testing with getting list with token', () => {
            return supertest(server)
            .get('/api/doctors')
            .set('Authorization', `${token}`)
            .expect(200)
        })
        it('GET testing with an array of 1 entry', () => {
            return supertest(server)
            .get('/api/doctors')
            .set('Authorization', `${token}`)
            .then( res => {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body).toHaveLength(1)
            })
        })
        it('GET records', () => {
            return supertest(server)
            .get('/api/records')
            .set('Authorization', `${token}`)
            .expect(200)
        })
    })
    describe('Records Listing', () => {
        beforeEach(async () => {
            await db('records').truncate()
        });
        it('GET records without token', () => {
            return supertest(server)
            .get('/api/records')
            .expect(400)
        })
        it('GET testing with an array of 1 entry', () => {
            return supertest(server)
            .get('/api/records')
            .set('Authorization', `${token}`)
            .then( res => {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body).toHaveLength(0)
            })
        })
        it('GET records with doctor_id', () => {
            return supertest(server)
            .get('/api/1/records')
            .expect(400)
        })
        it('GET records returning an array with 0', () => {
            return supertest(server)
            .get('/api/1/records')
            .set('Authorization', `${token}`)
            .then(res => {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body).toHaveLength(0)
            })
        })
    })
    describe('create 1 for records', () => {
        afterEach(async () => {
            await db('records').truncate()
        });
        it('POST records without token', () => {
            return supertest(server)
            .post('/api/records')
            .expect(400)
        })
        it('POST a single', () => {
            return supertest(server)
            .post('/api/records')
            .set('Authorization', `${token}`)
            .send({ patient_name: 'hung', doctor_id: '1' })
            .expect(201)
        })
        
    })
    describe('update and delete', () => {
        afterAll(async () => {
            await db('records').truncate()
        });
        it('POST a single', () => {
            return supertest(server)
            .post('/api/records')
            .set('Authorization', `${token}`)
            .send({ patient_name: 'hung', doctor_id: '1' })
            .expect(201)
        })
        it('GET records returning an array with 0', () => {
            return supertest(server)
            .get('/api/1/records')
            .set('Authorization', `${token}`)
            .then(res => {
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body).toHaveLength(1)
            })
        })
        it('PUT a record', () => {
            return supertest(server)
            .put('/api/1/records')
            .set('Authorization', `${token}`)
            .send({ patient_name: 'hanah', doctor_id: '1' })
            .expect(200)
        })
        it('delete a record', () => {
            return supertest(server)
            .delete('/api/1/records')
            .set('Authorization', `${token}`)
            .expect(200)
        })
        
    })

})