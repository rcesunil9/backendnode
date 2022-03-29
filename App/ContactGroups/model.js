const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const Reference = Schema.Types.ObjectId;

const ContactGroupSchema = new Schema({
    user: {
        type: String,
        trim: true
    },
    label: {
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

ContactGroupSchema
    .pre('find', autoPopulate)
    .pre('findOne', autoPopulate)

module.exports = mongoose.model("ContactGroupGroup", ContactGroupSchema);