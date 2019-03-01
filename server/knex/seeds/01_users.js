exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
  .then(function () {
    // Inserts seed entries
    return knex('users').insert([
      {
        id: 1,
        email: 'nigel@email.com',
        password: 'dorwssap',
        first_name: 'Nigel',
        last_name: 'Guy'
      },
      {
        id: 2,
        email: 'nakaz@email.com',
        password: 'password1',
        first_name: 'Nakaz',
        last_name: 'Person'
      },
      {
        id: 3,
        email: 'jaywon@email.com',
        password: 'password123',
        first_name: 'Jaywon',
        last_name: 'Individual'
      }
    ]);
  });
};
