require('dotenv').config();

import express from 'express';
import { router as PostRouter } from './routes/PostRoutes';
import { router as UserRouter } from './routes/UserRoutes';
import { connectToMongo } from './models/db';
const app = express();

app.listen(process.env.SERVER_PORT, () => {
    console.log('Server running');
});

import cors from 'cors';
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use('/posts/', PostRouter);
app.use('/users/', UserRouter);

connectToMongo();
