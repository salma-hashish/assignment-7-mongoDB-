require('dotenv').config();
const { MongoClient } = require('mongodb');

const uri = process.env.DB_URL || process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017';
const dbName = process.env.DB_NAME || 'C48-database';

const client = new MongoClient(uri);
const db = client.db(dbName);

async function connectDB() {
    try {
        await client.connect();
        console.log(`Connected to MongoDB successfully at: ${uri} (db: ${dbName})`);
    } catch (err) {
        console.error('Failed to connect to MongoDB:', err.message);
    }
}

db.client = client;
db.connectDB = connectDB;
db.db = db;

module.exports = db;
