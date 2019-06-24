const faker = require("faker");
const moment = require('moment');

const createFakeRecords = () => ({
  doctor_id: faker.random.number({min:1, max:5}),
  patient_name: faker.name.findName(),
  DOB: moment(faker.date.between('1948-01-01', '1989-12-31')).format('l'),  
});

exports.seed = async function(knex, Promise) {

  const fakeRecords = [];
  const desiredFakeRecords = 40;
  for (let i= 0; i < desiredFakeRecords; i++) {
    fakeRecords.push(createFakeRecords());
  }

  return knex('records').truncate()
    .then(function () {
      return knex('records').insert(fakeRecords);
    });

};
