import { DataSource } from 'typeorm'
import { createOrmConfig } from 'infra/postgres/create-ormconfig'
export const pgConnection = () => {
  return new DataSource(createOrmConfig())
}
