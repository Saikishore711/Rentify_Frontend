const express = require('express');
const Property = require('../Models/property');
const authMiddleware = require('../middleware/auth');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Destination folder for uploaded images
const fs = require('fs');

const router = express.Router();

// Middleware to verify JWT
router.use(authMiddleware);

// Create property
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, area, bedrooms, bathrooms, price, location, nearbyHospitals, nearbyColleges } = req.body;
        
        // Handle image uploads
        const images = req.files && Array.isArray(req.files)
            ? req.files.map(file => file.filename)
            : [];
        
        const property = new Property({
            owner: req.user.userId,
            title,
            description,
            area,
            bedrooms,
            bathrooms,
            price,
            location,
            nearbyHospitals,
            nearbyColleges,
            images
        });
        
        await property.save();
        res.status(201).send('Property posted');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET /api/properties/seller - Get properties posted by the authenticated seller
router.get('/seller', async (req, res) => {
    try {
        const properties = await Property.find({ owner: req.user.userId });
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// GET /api/properties/buyer - Get all properties available for buyers
router.get('/buyer', async (req, res) => {
    try {
        const properties = await Property.find();
        res.json(properties);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Update property
router.put('/', async (req, res) => {
    try {
        const propertyId = req.body.propertyId;
        const property = await Property.findOneAndUpdate(
            { _id: propertyId, owner: req.user.userId },
            req.body,
            { new: true }
        );
        if (!property) {
            return res.status(404).send('Property not found or you do not have permission to update it');
        }
        res.json(property);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// Delete property
router.delete('/', async (req, res) => {
    try {
        const propertyId = req.body.propertyId;
        const property = await Property.findOneAndDelete({ _id: propertyId, owner: req.user.userId });
        if (!property) {
            return res.status(404).send('Property not found or you do not have permission to delete it');
        }
        res.send('Property deleted');
    } catch (error) {
        res.status(400).send(error.message);
    }
});
module.exports = router;
