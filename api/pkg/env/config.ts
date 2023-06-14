import 'dotenv/config';

const config = {
  port: process.env.PORT,
  api_key: process.env.YOUR_API_KEY,
  rawgApiBaseUrl: process.env.RAWG_API_BASE_URL,
  dbHost: process.env.DATABASE_URL,
  dbName: process.env.DB_NAME,
  videogamesCollection: process.env.VIDEOGAMES_COLLECTION_NAME,
  host: process.env.HOST,
};

export default config;
