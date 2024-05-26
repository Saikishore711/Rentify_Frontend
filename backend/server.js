const express = require('express');
const { json } = require('express');
const mongoose = require('mongoose'); // Assuming mongoose package is installed
const cors = require('cors');
const healthCheckRouter = require('./routes/healthcheck')
require('dotenv').config();

const authRoutes = require('./routes/auth');
const propertyRoutes = require('./routes/properties');

const app = express();

app.use(cors());
app.use(json());


const username = process.env.MONGO_USERNAME;
const password = process.env.MONGO_PASSWORD;
const connectToDatabase = async () => {
  try {
    await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.foo0ivc.mongodb.net/Rentify`, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB successfully!');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1); // Exit process on connection failure
  }
};

connectToDatabase();


app.listen(5000, () => {
    console.log('Server is running on port 5000');
}); 

app.use('/api', healthCheckRouter);

app.use('/api/auth', authRoutes);
app.use('/api/properties', propertyRoutes);


