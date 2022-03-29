const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reference = Schema.Types.ObjectId;

const Message = new Schema({
    text: {
        type: String,
        trim: true,
        required: true
    }, 
    user: {
        type: Reference,
        ref: 'User'
    },
    chatId: {
        type: String,
        required: true
    },
    read: {
        type: String,
        enum: ['Yes', 'No'],
        default: 'No'
    }
}, {timestamps: true});

const autoPopulate = function (next) {
    this.populate('user')
    next();
}

Message
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model("Message", Message);
