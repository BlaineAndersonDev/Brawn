
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('titles').del()
    .then(function () {
      // Inserts seed entries
      return knex('titles').insert([
        {id: 1, name: 'Minecraft'},
        {id: 2, name: 'Rainbow Siege 6'},
        {id: 3, name: 'Super Mario 3'}
      ]);
    });
};
