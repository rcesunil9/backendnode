const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Reference = Schema.Types.ObjectId;

const MemberSchema = new Schema({
    coCart: {
        type: String,
        trim: true
    },
    user: {
        type: Reference,
        ref: 'User'
    },
    uniqueId: {
        type: String,
        trim: true
    },
    joined: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const autoPopulate = function (next) {
    this.populate('user');
    next();
}

MemberSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model('Member', MemberSchema);