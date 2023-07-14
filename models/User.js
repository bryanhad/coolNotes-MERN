const mongoose = require('mongoose')
const {Schema} = mongoose

const userSchema = new Schema({
    username : {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    role: [{
        type: String,
        default: 'Employee'
    }],
    active: {
        type: Boolean,
        default: true
    },
})

// to read and create documents in mongoDB, we have to provide a model. And we do that by using the model method that receives the name of the model (usually with a capital at the first letter), and the schema that we created previously.
module.exports = mongoose.model('User', userSchema)