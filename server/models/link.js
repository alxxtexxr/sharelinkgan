const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const model = mongoose.model;

const LinkSchema = new Schema({
    url: {
        type: String,
        required: true,
    },
    // A link has user
    user: {type: Schema.Types.ObjectId, ref: 'user'},
});

const Link = model('link', LinkSchema);

module.exports = Link;