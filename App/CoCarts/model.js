const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Reference = Schema.Types.ObjectId;

const CoCartSchema = new Schema({
    user: {
        type: Reference,
        ref: 'User'
    },
    type: {
        type: String,
        trim: true,
        enum: ['public', 'private']
    },
    label: {
        type: String,
        trim: true
    },
    rank: {
        type: Number
    },
    members: [{
        type: Reference,
        ref: 'Member'
    }],
    permissions: [{
        type: String,
        trim: true
    }],
    products: [{
        type: Reference,
        ref: 'Product'
    }],
    chatId: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const autoPopulate = function (next) {
    this.populate('members');
    this.populate('products')
    next();
}

CoCartSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model("CoCart", CoCartSchema);