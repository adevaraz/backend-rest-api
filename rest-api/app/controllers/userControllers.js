import Users from "../models/Users.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({ isAdmin: false });
        res.json(users);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const getAllAdmin = async (req, res) => {
    try {
        const admins = await Users.find({ isAdmin: true });
        res.json(admins);
    } catch(error) {
        res.status(500).json({ message: error.message })
    }
}

export const getUser = async (req, res) => {
    try {
        const user = await Users.findById(req.params.id).where({ isAdmin: false });

        if(!user) {
            const error = new Error();
            error.statusCode = 404;
            error.message = "No user with such id.";
            throw error;
        }

        res.status(200).json(user);
    } catch(error) {
        res.status(404).json({ message: error.message })
    }
}

export const getAdmin = async (req, res) => {
    try {
        const admin = await Users.findById(req.params.id).where({ isAdmin: true });

        if(!admin) {
            const error = new Error();
            error.statusCode = 404;
            error.message = "No admin with such id.";
            throw error;
        }

        res.status(200).json(admin);
    } catch(error) {
        if(error.statusCode && error.message) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(404).json({ message: error.message });
        }
    }
}

export const saveUser = async (req, res) => {
    const userData = new Users(req.body);
    try {
        const user = await Users.findOne({
            username: req.body.username
        });

        if(user) {
            const error = new Error();
            error.statusCode = 400;
            error.message = "Username is exist. Please use another username.";
            throw error;
        }

        const savedUser = await userData.save();
        res.status(201).json(savedUser);
    } catch(error) {
        if(error.statusCode && error.message) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const updateUser = async (req, res) => {
    try {
        const updatedData = req.body;
        const options = { new: true }; // to get updated data

        const updatedUser = await Users.findByIdAndUpdate(req.params.id, updatedData, options);

        if(!updatedUser) {
            const error = new Error();
            error.statusCode = 404;
            error.message = "No user with such id.";
            throw error;
        }

        res.status(201).json(updatedUser);
    } catch(error) {
        if(error.statusCode && error.message) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}

export const deleteUser = async (req, res) => {
    try {
        const deletedUser = await Users.findByIdAndDelete(req.params.id);

        if(!deletedUser) {
            const error = new Error();
            error.statusCode = 404;
            error.message = "No user with such id.";
            throw error;
        }

        res.status(201).json({ message: `Document with username ${deletedUser.name} successfully deleted..` });
    } catch(error) {
        if(error.statusCode && error.message) {
            res.status(error.statusCode).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
}