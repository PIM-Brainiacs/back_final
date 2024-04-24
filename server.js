import { config } from 'dotenv';
import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";


import { notFoundError, errorHandler } from "./middlewares/error-handler.js";
import { verifyAccessToken } from './middlewares/token-manager.js';

import userRoutes from './routes/user.js';
import authRoutes from './routes/authentification.js';



import dotenv from 'dotenv';


dotenv.config();

import bodyParser from 'body-parser';


const app = express();

const port = 9090;

const databaseName = 'game'


mongoose.set('debug', true);
mongoose.Promise = global.Promise;

mongoose
    .connect(`mongodb://127.0.0.1:27017/${databaseName}`)
    .then(() => {
        console.log(`Connected to ${databaseName}`);
    })
    .catch(err => {
        console.log(err);
    });

app.use(cors())
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/public',express.static('public'));

app.get('/', verifyAccessToken, async (req, res, next) => {
    //console.log(req.headers['authorization']);
    res.send('Hello Brainiacs!');
})


app.use('/user', userRoutes);
app.use('/auth', authRoutes);


app.use(notFoundError);
app.use(errorHandler);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));




app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
})
