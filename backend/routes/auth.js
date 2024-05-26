const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/user');

const router = express.Router();

// Register
router.post('/register', async (req, res) => {
    try {
        const { firstName, lastName, email, phone, password, role } = req.body;
        const user = new User({ firstName, lastName, email, phone, password, role });
        await user.save();
        res.status(201).send('User registered');
    } catch (error) {
        res.status(400).send(error);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { emailOrPhone, password } = req.body;

        // Find user by email or phone
        const user = await User.findOne({
            $or: [{ email: emailOrPhone }, { phone: emailOrPhone }]
        });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).send('Invalid credentials');
        }

        // Include all user details in the token payload
        const payload = {
            userId: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            role: user.role
        };

        const token = jwt.sign(payload, "jwtSecret", { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        res.status(400).send({ error: 'Login failed', details: error.message });
    }
});

module.exports = router;
