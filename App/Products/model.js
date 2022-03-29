const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Reference = Schema.Types.ObjectId;

const ProductSchema = new Schema({
    productObject: {
        type: Object,
        default: {}
    },
    coCart: {
        type: String,
        trim: true
    },
    user: {
        type: Reference,
        ref: 'User'
    },
    like: {
        type: Reference,
        ref: 'User',
        unique: true,
    },
    dislike: {
        type: Reference,
        ref: 'User',
        unique: true,
    },
    data: {
        type: Object,
        trim: true
    },
}, {
    timestamps: true
},{strict: true});

const autoPopulate = function (next) {
    this.populate('user', '-password');
    next();
}

ProductSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model('Product', ProductSchema);