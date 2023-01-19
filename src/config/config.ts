import dotenv from 'dotenv';

dotenv.config();
const { env } = process;

export const PORT = Number(env.API_PORT);
