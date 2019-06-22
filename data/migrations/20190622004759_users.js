
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', users =>{
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
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users')

};
