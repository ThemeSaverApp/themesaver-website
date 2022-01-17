const mongoose = require('mongoose')
const passport = require('passport')
const Schema = mongoose.Schema
passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },   
    githubID: {
        type: String,
        required: true,
        unique: true
    },
    rice: {
        type: Schema.Types.ObjectId,
        ref: 'Rice'
    }
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)