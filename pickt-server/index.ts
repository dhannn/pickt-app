require('dotenv').config();

import express from 'express';
import { router as PostRouter } from './routes/PostRoutes';
import { connectToMongo } from './models/db';
const app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

app.use('/posts/', PostRouter);

connectToMongo();
