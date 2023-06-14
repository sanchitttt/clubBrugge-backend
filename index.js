require('dotenv').config();
const mongoose = require('mongoose');
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;
const app = require('./app');


mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log('Successfully connected to the database...');
        app.listen(PORT, () => console.log(`Listening on PORT ${PORT}...`));
    })
    .catch((err) => console.log('Failed to connect to the database...\ne    rr'));