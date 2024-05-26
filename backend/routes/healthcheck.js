const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/health', async (req, res) => {
    const healthCheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };

    try {
        // Check MongoDB connection status
        const dbState = mongoose.connection.readyState;
        healthCheck.database = {
            connection: dbState === 1 ? 'Connected' : 'Not Connected',
            state: dbState
        };

        // Add more checks if necessary
        // Example: Check another service or external API status

        res.status(200).json(healthCheck);
    } catch (error) {
        healthCheck.message = 'ERROR';
        res.status(503).json(healthCheck);
    }
});

module.exports = router;
