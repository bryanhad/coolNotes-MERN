const asyncHandler = require('express-async-handler')
const Note = require('../models/Note')
const User = require('../models/User')


// @desc get all note
// @route GET /notes
// @access Private
const getAllNotes = asyncHandler(async (req, res) => {
    // get all notes from db
    const notes = await Note.find({}).lean().exec()

    // if no notes
    if (!notes?.length) {
        return res.status(400).json({message: 'No notes found!'})
    }

    // Add username to each note before sending the response
    const notesWithUsername = await Promise.all(notes.map( async (note) => {
        const user = await User.findById(note.user).lean().exec()
        return {...note, username: user.username}
    }))

    res.json(notesWithUsername)
})

// @desc create a note
// @route POST /notes
// @access Private
const createNewNote = asyncHandler(async (req, res) => {
    const { user, title, text } = req.body
    console.log(req.body)

    // Confirm data
    if (!user || !title || !text) {
        return res.status(400).json({ message: 'All fields are required' })
    }

    // Check for duplicate title
    const duplicate = await Note.findOne({ title }).lean().exec()

    if (duplicate) {
        return res.status(409).json({ message: 'Duplicate note title' })
    }

    // Create and store the new user 
    const note = await Note.create({ user, title, text })

    if (note) { // Created 
        return res.status(201).json({ message: 'New note created' })
    } else {
        return res.status(400).json({ message: 'Invalid note data received' })
    }

})
// @desc Update a note
// @route PATCH /notes
// @access Private
const updateNote = asyncHandler(async (req, res) => {
    const {id, title, text, completed} = req.body

    if (!id || !title || !text || typeof completed !== 'boolean') {
        return res.status(400).json({message: 'Please fill in all required fields!'})
    }

    // confirm the note to be updated exists
    const note = await Note.findById(id).exec()

    // check for duplicate
    const duplicate = await Note.findOne({title}).lean().exec()

    // only allow renaming title thas has a unique title
    if (duplicate && duplicate._id.toString() !== id) {
        return res.status(409).json({message: 'Title has already been taken!'})
    }

    note.title = title
    note.text = text
    note.completed = completed

    const updatedNote = await note.save()

    if (updatedNote) {
        res.status(200).json({message: `Note has successfuly been updated!`})
    } else {
        res.status(500).json({message: 'Failed to update the note!'})
    }
})

// @desc delete a note
// @route DELETE /notes
// @access Private
const deleteNote = asyncHandler(async (req, res) => {
    const {id} = req.body

    if (!id) {
        res.status(400).json({message: 'Please specify the Id of the note!'})
    }

    // confirm the note to be deleted does exists
    const note = await Note.findById(id).exec()

    if(!note) {
        res.status(400).json({message:'Note not found!'})
    }

    const deletedNote = await note.deleteOne()

    if (deletedNote) {
        res.status(200).json({message: `Note ${deletedNote.title} with ID ${deletedNote._id} has been successfuly deleted!`})
    } else {
        res.status(400).json({message: 'Failed to delete the note!'})
    }
})

module.exports = {getAllNotes, createNewNote, updateNote, deleteNote}