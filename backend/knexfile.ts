import { config } from 'dotenv'
import knex from 'knex' // ✅ default import statt named import

config()

export default {
  client: 'sqlite3',
  connection: {
    filename: './dev.sqlite3'
  },
  useNullAsDefault: true,
  migrations: {
    extension: 'ts',
    directory: './migrations'
  }
} satisfies Parameters<typeof knex>[0]
