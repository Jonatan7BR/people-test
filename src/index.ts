import express from 'express';
import { PORT } from './config/config';
import { sequelize } from './config/sequelize';

const app = express();

app.listen(PORT, () => {
    console.log('Server started');
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connected to database');
    })
    .catch(error => {
        console.error('Error while connecting to database', error);
    });
