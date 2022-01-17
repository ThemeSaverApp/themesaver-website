const mongoose = require('mongoose')
const Schema = mongoose.Schema

const riceSchema = new Schema({
    name: {
        required: true,
        type: String,
    },
    windowManager: {
        required: true,
        type: String,
    },
    desktopEnvironment: {
        required: true,
        type: String,
    },    
    shell: {
        required: true,
        type: String,
    },
    gtkTheme: {
        required: true,
        type: String,
    },    
    iconTheme: {
        required: true,
        type: String,
    },   
    Screenshots: [{
        type: String
    }],
    url: {
        required: true,
        type: String,
    },      
    branch: {
        required: true,
        type: String,
    },       
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    } 
})

module.exports = mongoose.model('Rice', riceSchema)