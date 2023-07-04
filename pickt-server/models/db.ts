import { MongoClient } from 'mongodb';

const mongoURI = process.env.MONGO_URI;

const client = new MongoClient(mongoURI || '');

export function connectToMongo(callback: Function) {
    client.connect()
        .then(() => {
            return callback();
        })
        .catch((err) => {
            callback(err);
        })
}

export function getDb() {
    return client.db(process.env.DB_NAME);
}


function handleSignal(): void {
    console.log('Closing MongoDB connection');
    client.close();
    process.exit();
}

process.on('SIGINT', handleSignal);
process.on('SIGTERM', handleSignal);
process.on('SIGQUITE', handleSignal);
