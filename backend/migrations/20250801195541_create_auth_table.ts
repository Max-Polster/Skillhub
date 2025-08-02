import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('auth_tokens', (table) => {
    table.increments('id').primary()
    table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE')
    table.string('token').notNullable()
    table.string('type').notNullable() // z.B. 'refresh', 'reset-password'
    table.timestamp('expires_at').notNullable()
    table.timestamps(true, true) // created_at, updated_at
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('auth_tokens')
}
