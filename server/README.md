# Server

## Knex:
  * [Migration & Seed Examples](https://gist.github.com/NigelEarle/70db130cc040cc2868555b29a0278261)
#### Knex - Migrations
  * `knex migrate:make <table_name>`
    ```
      exports.up = function (knex, Promise) {
        return Promise.all([
          knex.schema.createTable('jokes', table => {
            table.increments('id').primary()
            table.string('author')
            table.string('body')
          })
        ])
      }

      exports.down = function (knex, Promise) {
        return Promise.all([
          knex.schema.dropTable('jokes')
        ])
      }
    ```
  * `knex migrate:latest`
  * `knex migrate:rollback`

#### Knex - Seeds
  * `knex seed:make <seed_name>`
    ```
      exports.seed = function(knex, Promise) {
        // Deletes ALL existing entries
        return knex('jokes').del()
        .then(function () {
          // Inserts seed entries
          return knex('jokes').insert([
            {
              id: 1,
              author: 'Shaggy',
              body: 'You like, better knock it off before I make your disappearance the gangs next mystery.'
            },
            {
              id: 2,
              author: 'Blaine',
              body: 'knock knock, KGB OPEN UP!'
            },
            {
              id: 3,
              author: 'Long Joke',
              body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
            }
          ]);
        });
      };
    ```
  * `knex seed:run`
