import mongoose from 'mongoose';
import { initializePost } from './PostDB';
import { initializeUsers } from './UserDB';

const mongoURI = process.env.MONGO_URI;
const dbName = process.env.DB_NAME

mongoose.connect(mongoURI || '', { dbName: dbName });

export function connectToMongo() {
    const db = mongoose.connection;
    console.log(db.collections['posts'] === undefined);

    if (db.collections['posts'] === undefined) {
        db.createCollection('posts');
        initializePost();
    }
    
    if (db.collections['users'] === undefined) {
        db.createCollection('users');
        initializeUsers();
    }
    
    db.on('error', console.error.bind(console, 'Connection error:'));
    db.once('open', () => console.log('Connected to MongoDB client'));
}


function handleSignal(): void {
    console.log('Closing MongoDB connection');
    process.exit();
}

process.on('SIGINT', handleSignal);
process.on('SIGTERM', handleSignal);
process.on('SIGQUITE', handleSignal);
