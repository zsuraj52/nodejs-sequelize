import express from 'express';
import morgan from 'morgan';
import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
dotenv.config();
import adminRouter from './src/routes/adminRoutes';
import userRouter from './src/routes/userRoutes';
import customerRouter from './src/routes/customerRoutes';
import logger from './src/logger/logger';
import { banner } from './src/logger/banner';
import * as models from './src/models/index';

const port = process.env.PORT;
const app = express();

app.use(express.json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens['response-time'](req, res), 'ms',
    ].join(' ')
}));
app.use('/api/admin', adminRouter);
app.use('/api/user', userRouter);
app.use('/api/customer',customerRouter)

const { DATABASE, DB_USERNAME, DB_PASSWORD, DIALECT, DB_HOST } = process.env;

if (!DATABASE || !DB_USERNAME || !DB_PASSWORD || !DIALECT || !DB_HOST) {
    throw new Error('Missing required environment variables.');
}
const sequelize = new Sequelize(DATABASE, DB_USERNAME, DB_PASSWORD, {
    host: DB_HOST,
    dialect: DIALECT as any,
    models: [...Object.values(models)],
  });

(async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync({ alter: true, force: false });
        
        app.listen(port, () => {
            banner(logger);
        });
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();
