const faker = require("faker");

const createFakeRecords = () => ({
  doctor_id: faker.random.number({min:1, max:5}),
  patient_name: faker.name.findName(),  
});

exports.seed = async function(knex, Promise) {

  const fakeRecords = [];
  const desiredFakeRecords = 40;
  for (let i= 0; i < desiredFakeRecords; i++) {
    fakeRecords.push(createFakeRecords());
  }
  await knex('records').insert(fakeRecords)

};
