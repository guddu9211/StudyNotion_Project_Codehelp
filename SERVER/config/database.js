const mongoose = require('mongoose');
require('dotenv').config()

const db_url = process.env.MONGODB_URL;
exports.connect = () => {
    mongoose.connect(db_url, {
        // not needed to add any tags for useNewParser or useUnifiedTopology
    })
    .then( () => {
        console.log("DB connected successfully at ",db_url);
    })
    .catch( (err) => {
        console.log("DB connection FAILED :(  must check db url ", db_url)
        console.error(err);
        process.exit(1);
    })
};
