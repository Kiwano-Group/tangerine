// const { UserRecord } = require('firebase-admin/lib/auth/user-record')
const mongoose = require('mongoose')
const uri = process.env.MONGODB_URI;


const User = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add a name"]
    },
    email: {
        type: String,
        required: [true, "Please add an email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please add a password"]
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', User)