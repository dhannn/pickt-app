require('dotenv').config();

import express from 'express';
import { router as PostRouter } from './routes/PostRoutes';
import { connectToMongo, getDb } from './models/db';
const app = express();


console.log(process.env.SERVER_PORT);


app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

app.use('/posts/', PostRouter);

initializeDatabase();

function initializeDatabase() {
    connectToMongo(handleError);
    console.log('Connected to MongoDB client');

    function handleError(err: string) {
        if (err) {
            console.log('Error occured');
            console.error(err);
            process.exit();
        }
    }
}
