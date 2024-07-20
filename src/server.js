// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import 'dotenv/config';

import env from './utils/env.js';

import contactsRouter from './routers/contacts.js';
import notFoundHandler from './middlewares/notFoundHandler.js';
import errorHandler from './middlewares/errorHandler.js';
import authRouter from './routers/auth.js';
import { UPLOAD_DIR } from './constants/index.js';
import swaggerDocs from './middlewares/swaggerDocs.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use(cookieParser());

    const logger = pino({
        transport: {
            target: 'pino-pretty',
        },
    });
    // app.use(logger);
    app.use("/api-docs", swaggerDocs());
    app.use('/auth', authRouter)
    app.use('/contacts', contactsRouter);
    app.use('/uploads', express.static(UPLOAD_DIR));

    app.use(notFoundHandler);
    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
