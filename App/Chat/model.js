const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Reference = Schema.Types.ObjectId;

const Chat = new Schema({
    coCart: {
        type: Reference,
        ref: 'CoCart'
    },
    messages: [{ 
        type: Reference,
        ref: 'Message'
    }]
}, {timestamps: true});

const autoPopulate = function (next) {
    this.populate('messages');
    this.populate('coCart');
    next();
}

Chat
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model("Chat", Chat);
