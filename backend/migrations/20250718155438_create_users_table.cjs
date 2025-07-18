/**
 * @param {import('knex').Knex} knex
 */
exports.up = async function (knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('name').notNullable()
    table.string('email').unique().notNullable()
    table.timestamps(true, true)
  })
}

/**
 * @param {import('knex').Knex} knex
 */
exports.down = async function (knex) {
  return knex.schema.dropTable('users')
}
