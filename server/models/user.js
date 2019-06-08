const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
const model = mongoose.model;
const saltRounds = 10;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    // User has many links
    links: [{type: Schema.Types.ObjectId, ref: 'link'}],
});

// Hash user password before saving
UserSchema.pre('save', function (next) {
    this.password = bcrypt.hashSync(this.password, saltRounds);

    next();
});

const User = model('user', UserSchema);

module.exports = User;
