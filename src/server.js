// src/server.js
import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getEnvVar } from './utils/getEnvVar.js';
import contactsRouter from './routers/index.js'; // 
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';

dotenv.config();


const PORT = Number(getEnvVar('PORT', '3000'));

export const startServer = () => {

	const app = express();
	app.use(express.json({
		type: ['application/json', 'application/vnd.api+json'],
		limit: '100kb',
	}));
	app.use(cors());
	app.use(cookieParser());

	app.use(
		pino({
			transport: {
				target: 'pino-pretty',
			},
		}),
	);
	app.use(contactsRouter);
	app.use(notFoundHandler);
	app.use(errorHandler);
	app.listen(PORT, () => {
		console.log(`Server is running on ${PORT}`);
	});

    const app = express();

    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json'],
        limit: '100kb',
    }));

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );



    app.use(contactsRouter);


    app.use(notFoundHandler);

    app.use(errorHandler);



    app.get('/contacts', async (req, res) => {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: "Successfully found contacts!",
            data: contacts,
        });
    });

    app.get('/contacts/:contactId', async (req, res, next) => {
        const { contactId } = req.params;
        const contact = await getContactById(contactId);

        // Відповідь, якщо контакт не знайдено
        if (!contact) {
            res.status(404).json({
                status: 404,
                message: 'Contact not found'
            });
            return;
        }

        // Відповідь, якщо контакт знайдено
        res.status(200).json({
            status: 200,
            message: "Successfully found contact with id {contactId}!",
            data: contact,
        });
    });
    app.use((req, res, next) => {
        res.status(404).json({
            status: 404,
            message: 'Not found',
        });
    });

    app.use((err, req, res, next) => {
        res.status(500).json({
            status: 500,
            message: 'Something went wrong',
            error: err.message,
        });
    });


    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT}`);
    });

};
