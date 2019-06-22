
exports.seed = function(knex, Promise) {
  return knex('users').truncate()
    .then(function () {
      return knex('users').insert([
        { username: 'hung', password:'pass'},
        { username: 'bryant', password:'pass'},
        { username: 'john', password:'pass'},
      ]);
    });
};
