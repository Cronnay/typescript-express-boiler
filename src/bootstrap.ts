import express from 'express';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

const app = express();
/**
 * Will take body from HTTP-request and set it to the request property
 * Only works if Content-Type is JSON
 */
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));

/**
 * Controllers
 */
import AppController from './app/Controllers/AppController';
app.use('/', new AppController().router);

createConnection()
.then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => { console.log(`Server started on port ${port}`)});  
});
