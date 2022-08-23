import jwt from 'jsonwebtoken';
import Users from "../models/Users.js";
import config from '../config/auth.config.js';

export const signIn = async(req, res) => {
    try {
        const user = await Users.findOne({
            username: req.body.username
        });
    
        // check whether username is exist or no
        if(!user) {
            const error = new Error("Invalid credential.");
            error.statusCode = 401;
            error.message = "No account with such username.";
            throw error;
        }

        // check whether password true or false
        if(!(req.body.password === user.password)) {
            const error = new Error("Invalid credential");
            error.statusCode = 401;
            error.message = "Invalid password.";
            throw error;
        }

        const token = jwt.sign(
            {
                username: user.username,
                isAdmin: user.isAdmin
            },
            config.secret,
            { expiresIn: 3600 } // an hour
        );

        res.status(200).json({ token: token });
    } catch(error) {
        if(error.statusCode && error.message) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}