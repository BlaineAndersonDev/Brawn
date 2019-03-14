exports.up = function (knex, Promise) {
  return Promise.all([
    knex.schema.createTable('jokes', table => {
      table.increments('id').primary()
      table.string('author')
      table.string('body', 1500)
      table.string('imagePublicId')
    })
  ])
}

exports.down = function (knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('jokes')
  ])
}
