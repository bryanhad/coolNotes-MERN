const mongoose = require('mongoose')
const {Schema} = mongoose
// package for creating a autoincrement value
const AutoIncrement = require('mongoose-sequence')(mongoose)

const noteSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
},
// timestamps is just a options in creating a schema, with timeStamps, mongoDB will automatically give us the createdAt and updatedAt to our schema
{ timestamps: true }
)

noteSchema.plugin(AutoIncrement, {
    // the field name that will be created inside of the schema
    inc_field: 'ticket',
    // something inside the counter collection that will be automatically created.. idk what the id is responsible for tho lol
    id: 'ticketNums',
    start_seq: 0
})

module.exports = mongoose.model('Note', noteSchema)