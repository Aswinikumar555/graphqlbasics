import { DataSourceOptions } from 'typeorm'

export function createOrmConfig() {
  const credObject: any = {
    host: "localhost",
    port: "5432",
    database: "testing_experimental",
    username: "nlearn_postgres_user",
    password: "nlearn_postgres_password",
  }
  const { host, port, database, username, password } = credObject
  const connectionOpts: DataSourceOptions = {
    type: 'postgres',
    host,
    port,
    username,
    password,
    database,

    entities: [__dirname + '/**/*.entity{.ts,.js}'],

    synchronize: false,

    logging: false,

    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  }

  return connectionOpts
}
