import 'dotenv/config';

const config = {
port: process.env.PORT,
api_key: process.env.API_KEY,
rawgApiBaseUrl: process.env.RAWG_API_BASE_URL,
};

export default config;
