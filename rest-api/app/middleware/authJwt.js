import jwt from 'jsonwebtoken';
import config from '../config/auth.config.js';

export const verifyUser = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];

        if(!token) {
            const error = new Error();
            error.statusCode = 403;
            error.message = "No token provided.";
            throw error;
        }

        const decoded = jwt.verify(token, config.secret)

        if(!decoded) {
            const error = new Error();
            error.statusCode = 401;
            error.message = "Unauthorized.";
            throw error;
        }

        req.username = decoded.username
        next()
    } catch(error) {
        if(error.statusCode && error.message) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const verifyAdmin = (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(' ')[1];

        if(!token) {
            const error = new Error();
            error.statusCode = 403;
            error.message = "No token provided.";
            throw error;
        }

        const decoded = jwt.verify(token, config.secret)

        if(!decoded) {
            const error = new Error();
            error.statusCode = 401;
            error.message = "Unauthorized.";
            throw error;
        }

        if(!decoded.isAdmin) {
            const error = new Error();
            error.statusCode = 403;
            error.message = "You have no access to this endpoint.";
            throw error;
        }

        req.username = decoded.username
        next()
    } catch(error) {
        res.status(500).json({ message: error });
    }
}