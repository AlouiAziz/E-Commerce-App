const User = require('../models/user.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { models } = require('mongoose');

exports.register = async (req, res) => {
    try {
        const { nom, prenom, email, password } = req.body;
        const existingUser = await User.findOne({ email: req.body.email, isActive: true })
        if (existingUser) {
            return res.status(401).json({ errors: [{ msg: "User already exsit with this email" }] })
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = new User({ nom, prenom, email, password: hashedPassword })
        await user.save()
        const token = jwt.sign({ userId: user._id }, 'your_secrete_key', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }) // maxAge en milisecondes = 1h
        return res.status(201).json({
            token,
            user: {
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                password: user.password
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            payload: "Error register Auth a user"
        })
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email, isActive: true })
        if (!user) {
            return res.status(401).json(
                { errors: [{ msg: "Email Or Password incorrect" }] }
            )
        }

        const passwordMAtch = await bcrypt.compare(password, user.password);
        if (!passwordMAtch) {
            return res.status(401).json({
                errors: [{ msg: "Email Or Password incorrect" }]
            })
        }

        const token = jwt.sign({ userId: user._id }, 'your_secrete_key', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true, secure: true, maxAge: 3600000 }) // maxAge en milisecondes = 1h
        return res.status(201).json({
            payload: "Login Successfully",
            token,
            user: {
                nom: user.nom,
                prenom: user.prenom,
                email: user.email,
                password: user.password
            }
        });

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            payload: "Error login Auth a user"
        })
    }
}

// Not Used

exports.logout = (req, res) => {
    return res.clearCookie('token').status(200).json({ message: 'LogOut' });
}

exports.current = async (req, res) => {
    try {
        const user = await User.findById(req.user.id)
        res.send(user)
    } catch (error) {
        res.status(500).send('Server error')
    }
}
