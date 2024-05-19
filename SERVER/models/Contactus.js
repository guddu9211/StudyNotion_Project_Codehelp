const mongoose = require('mongoose')

const contactusSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        trim: true,
        default: 'No message text',
    },
    phoneNo: {
        type: String,
        trim: true,
        default: '99999 99999'
    },
});

module.exports = mongoose.model("Contactus", contactusSchema)