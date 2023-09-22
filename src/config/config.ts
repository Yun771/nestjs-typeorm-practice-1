export default () => ({
  mode: process.env.MODE,
  is_dev: process.env.MODE === 'DEV',
  port: parseInt(process.env.PORT) || 3000,
  db: {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DATABASE,
  },
  secret_key: process.env.SECRET_KEY,
});
