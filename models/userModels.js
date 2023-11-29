const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    password: {
        type: String,
        required: [true, 'password is required']
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isDoctor: {
        type: Boolean,
        default: false
    },
    image: {
        type: String,
    },
    notification: {
        type: Array,
        default: []
    },
    seennotification: {
        type: Array,
        default: []
    }
})
const userModel = mongoose.model('users', UserSchema);
module.exports = userModel;