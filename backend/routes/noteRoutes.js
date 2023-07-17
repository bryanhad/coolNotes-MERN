// create a router instance
const express = require('express')
const router = express.Router()
const noteController = require('../controllers/noteController')

// make a chainable route handlers for a single route path
router.route('/')
    .get(noteController.getAllNotes)
    .post(noteController.createNewNote)
    .patch(noteController.updateNote)
    .delete(noteController.deleteNote)

module.exports = router