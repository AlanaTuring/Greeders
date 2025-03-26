//Mira Abbas code (you can reset the database by running this file in the command prompt)
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        return mongoose.connection.db.dropDatabase();
    })
    .then(() => {
        console.log('Database dropped');
        return mongoose.disconnect();
    })
    .then(() => {
        console.log('Disconnected from MongoDB');
    })
    .catch(err => {
        console.error('Error:', err.message);
    });
