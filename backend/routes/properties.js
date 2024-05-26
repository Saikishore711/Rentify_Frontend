const express = require('express');
const Property = require('../Models/property');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Middleware to verify JWT
router.use(authMiddleware);

// Create property
router.post('/', async (req, res) => {
    try {
        const property = new Property({ ...req.body, owner: req.user.userId });
        await property.save();
        res.status(201).send('Property posted');
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get properties
router.get('/', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Get properties by owner
router.get('/owner', async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.userId });
        res.json(properties);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Update property
router.put('/:id', async (req, res) => {
    try {
        const property = await Property.findOneAndUpdate(
            { _id: req.params.id, owner: req.user.userId },
            req.body,
            { new: true }
        );
        res.json(property);
    } catch (error) {
        res.status(400).send(error);
    }
});

// Delete property
router.delete('/:id', async (req, res) => {
    try {
        await Property.findOneAndDelete({ _id: req.params.id, owner: req.user.userId });
        res.send('Property deleted');
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
