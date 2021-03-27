import { createConnection, Connection } from 'typeorm'

export async function db () : Promise<Connection> {
  return await createConnection({
    name: 'postgresDBDonnection',
    type: 'postgres',
    url: process.env.DATABASE_URL,
    synchronize: true,
    logging: false,
    extra: {
      ssl: {
        rejectUnauthorized: false
      }
    }, 
    entities: [
      __dirname + "/entity/*.ts"
    ]
  })
}
