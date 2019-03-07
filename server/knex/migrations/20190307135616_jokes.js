exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('jokes', table => {
      table.increments('id').primary()
      table.string('author')
      table.string('body', 1000) // 1000 sets varchar limit to 1000.
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('jokes')
  ])
}
