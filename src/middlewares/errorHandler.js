

// Імпортуємо клас HttpError для обробки помилок HTTP з відповідними статус-кодами
import { HttpError } from 'http-errors';

export const errorHandler = (err, req, res, next) => {

    console.log(err);
    // Перевірка, чи отримали ми помилку від createHttpError
    if (err instanceof HttpError) {
        res.status(err.status).json({
            status: err.status,
            message: err.name,
            data: err,
        });
        return;
    }
    res.status(500).json({
        message: 'Something went wrong',
        error: err.message,
    });
}; 
