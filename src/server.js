// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

import { env } from './utils/env.js';
import { getContacts, getContactById } from './services/contactServices.js';

const PORT = Number(env('PORT', '3000'));

export const setupServer = () => {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const logger = pino({
        transport: {
            target: 'pino-pretty',
        },
    });
    app.use(logger);

    app.get('/contacts', async (req, res) => {
        try {
            const data = await getContacts();
            res.json({
                status: 200,
                data,
                message: 'Successfully found contacts!',
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    });

    app.get('/contacts/:contactId', async (req, res) => {
        const { contactId } = req.params;
        try {
            const data = await getContactById(contactId);
            if (!data) {
                return res.status(404).json({
                    message: 'Not found!',
                });
            }
            res.json({
                status: 200,
                data,
                message: `Successfully found contact with id ${contactId}!`,
            });
        } catch (error) {
            if (error.message.includes('Cast to ObjectId failed')) {
                error.status = 404;
            }
            const { status = 500 } = error;
            res.status(status).json({
                message: error.message,
            });
        }
    });

    app.use((req, res, next) => {
        res.status(404).json({
            message: 'Not found',
        });
    });

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
