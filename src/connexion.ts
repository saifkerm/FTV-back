const mongoose = require('mongoose');

const DB_PORT = process.env.DB_PORT || 27017;
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_NAME: string = process.env.DB_NAME || 'fdj';
const DB_USER: string = process.env.DB_USER || 'root';
const DB_PASSWORD: string = process.env.DB_PASSWORD || 'root';

export const DB_URI: string = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}`;

/**
 * Connection to mongodb database with mongoose
 *
 * @returns {void} return void
 */
export async function dbConnection(): Promise<void> {

    await mongoose.connect(DB_URI, {
        dbName: 'sports'
    }).then(() => {
        console.log(`Connected to ${DB_URI}`);
    }).catch((err: any) => console.log(err));
}