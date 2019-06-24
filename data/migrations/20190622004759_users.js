
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('doctors', doctors =>{
    doctors.increments();
    doctors
    .string('username', 120)
    .notNullable()
    .unique();
    doctors
    .string('password', 120)
    .notNullable()
    doctors
    .string('name', 130)
    .nullable()
  })
  .createTable('patients', patients => {
    patients.increments();
    patients
    .string('username', 120)
    .notNullable()
    .unique();
    patients
    .string('password', 120)
    .notNullable()
    patients
    .string('name', 130)
    .nullable()
  })
  .createTable('records', records => {
    //user_id, last_updated, vaccination, doctor_id
    records.increments()
    records
    .integer('doctor_id')
    .unsigned()
    .references('id')
    .inTable('doctors')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .notNullable()
    records
    .integer('patient_id')
    .unique()
    .unsigned()
    .references('id')
    .inTable('patients')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .nullable()
    records
    .string('patient_name', 125)
    .notNullable()
    records
    .date('DOB')
    .nullable()
  })
  .createTable('shots', shots =>{
    shots.increments();
    shots
    .integer('record_id')
    .unsigned()
    .references('id')
    .inTable('records')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    .notNullable()
    shots
    .text('description')
    .notNullable();
    shots
    .timestamp('updated_time')
    .notNullable();
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('shots')
    .dropTableIfExists('records')
    .dropTableIfExists('patients')
    .dropTableIfExists('doctors')

};
