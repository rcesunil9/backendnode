const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Reference = Schema.Types.ObjectId;

const ContactSchema = new Schema({
    user: {
        type: String,
        trim: true
    },
    list: [{
        type: Reference,
        ref: 'User'
    }]
},
{
    timestamps: true
});

const autoPopulate = function (next) {
    this.populate('list');
    next();
}

ContactSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model("Contact", ContactSchema);