const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Schema = mongoose.Schema;

const UserModel = new Schema({
    avatar: {
        type: String,
        trim: true
    },
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        unique: true,
        required: true
    },
    userName: {
        type: String,
        trim: true
    },
    name: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    gender: {
        type: String
    },
    zipcode: {
        type: String
    },
    dob: {
        type: String,
        trim: true
    },
    password: {
        type: String,
        trim: true
    },
    token: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});
UserModel.pre('save', async function (next) {
    const newPaswword = await bcrypt.hash(this.password, 8);
    this.password = newPaswword;
    next();
});

UserModel.methods.comparePassword = function (candidatePassword) {
    return bcrypt.compare(candidatePassword, this.password);
}

module.exports = mongoose.model('User', UserModel);