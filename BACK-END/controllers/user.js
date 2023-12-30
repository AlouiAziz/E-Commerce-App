const User = require('../models/user.js')
const bcrypt = require('bcrypt');

// Create New User

exports.createUser = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;

        // Check if password is empty
        if (!password) {
            return res.status(400).json({
                payload: "Password is required"
            });
        }

        const isExisting = await User.findOne({ email: req.body.email, isActive: true })

        if (isExisting) {
            return res.status(200).json({
                payload: "User already exists with this email"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ nom, prenom, email, password: hashedPassword });
        await user.save();

        res.status(201).json({
            payload: "User created successfully"
        });
    } catch (error) {
        res.status(500).json({
            payload: "Error creating user"
        });
    }
}


// Get All Users

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isActive: true })
        let data
        if (users && !users.length) {
            data = ("No Data Found")
        }
        else {
            data = users
        }
        return res.status(200).json({
            payload: data
        })
    } catch (error) {
        res.status(500).json({
            payload: "Error Getting Users"
        })
    }
}

// Get One User

exports.getOneUser = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id, isActive: true })
        let data
        if (user) {
            data = user
        }
        else {
            data = "No Data Found"
        }
        return res.status(200).json({
            payload: data
        })
    } catch (error) {
        res.status(500).json({
            payload: "Error Getting Users"
        })
    }
}

// Update User

exports.updateUser = async (req, res) => {
    try {
        const isExisting = await User.findOne({ email: req.body.email, isActive: true });

        if (isExisting) {
            return res.status(200).json({
                payload: "Cannot Update User Name Already Existing"
            });
        }

        // Check if the request includes a new password
        if (req.body.password) {
            // Hash the new password
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        const user = await User.findOneAndUpdate(
            { _id: req.params.id, isActive: true },
            req.body,
            { new: true }
        );

        let data;
        if (user) {
            data = user;
        } else {
            data = "No Data Found";
        }

        return res.status(200).json({
            payload: data
        });
    } catch (error) {
        res.status(500).json({
            payload: "Error Updating User"
        });
    }
};


// Delete User

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findOneAndUpdate({ _id: req.params.id }, { isActive: false })
        let data
        if (user) {
            data = "User is Deleted"
        }
        else {
            data = "No Data Found"
        }
        return res.status(200).json({
            payload: data
        })
    } catch (error) {
        res.status(500).json({
            payload: "Error Deleting User"
        })
    }
}