export = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'test',
  synchronize: false,
  entities: [
    'src/entity/**/*.ts'
  ],
  migrations: [
    'src/migration/*.ts'
  ],
  seeds: ['src/seeds/*.ts'],
  subscribers: [
    'src/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber'
  }
};
