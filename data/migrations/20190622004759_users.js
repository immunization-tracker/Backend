
exports.up = function(knex, Promise) {
  return knex.schema
  .createTable('users', users =>{
    users.increments();
    users
    .string('username', 120)
    .notNullable()
    .unique();
    users
    .string('password', 120)
    .notNullable()
    users
    .string('role', 50)
    .defaultTo('patient')
    .notNullable()
    users
    .string('name', 130)
    .nullable()
    users
    .date('DOB')
    .nullable()
  })
  .createTable('records', records => {
    //user_id, last_updated, vaccination, doctor_id
    records.increments()
    records
    .integer('user_id')
    .unique()
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    records
    .integer('doctor_id')
    .unsigned()
    .references('id')
    .inTable('users')
    .onDelete('CASCADE')
    .onUpdate('CASCADE')
    records
    .date('last_updated')
    .nullable()
    records
    .text('vaccination')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('records')

};
