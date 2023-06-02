import 'dotenv/config';

const config = {
port: process.env.PORT,
api_key: process.env.YOUR_API_KEY,
rawgApiBaseUrl: process.env.RAWG_API_BASE_URL,
dbHost: process.env.DATABASE_URL,
};

export default config;
