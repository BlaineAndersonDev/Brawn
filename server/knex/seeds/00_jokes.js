exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('jokes').del()
  .then(function () {
    // Inserts seed entries
    return knex('jokes').insert([
      {
        id: 1,
        author: 'Shaggy',
        title: 'Scooby and the Gangs secret',
        body: 'You like, better knock it off before I make your disappearance the gangs next mystery.',
        imagePublicId: 'seeds/seed_shaggy'
      },
      {
        id: 2,
        author: 'Blaine',
        title: 'Rainbow 6 Siege Hijinx',
        body: 'knock knock, KGB OPEN UP!',
        imagePublicId: 'seeds/seed_fuze_kgb'
      },
      {
        id: 3,
        author: 'Unknown',
        title: 'A great ancient philosophy',
        body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        imagePublicId: 'seeds/seed_aristotle'
      }
    ]);
  });
};
