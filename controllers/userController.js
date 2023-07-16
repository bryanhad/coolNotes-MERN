const User = require('../models/User')
const Note = require('../models/Note')
// async handler, will keep us from using so many try catch blocks as we use async functions from mongoose, just to make our life easier lol
// update:
// i just confirmed something that asyncHandler do. like when I tried to send a req to the api with a inproper json, e.g. there is a comma at the end of a property-value-pair, the route sends back a res json : {message: 'Unexpected token } in JSON at position 53}. so yeah, I think it helps with that sortof stuffs..
const asyncHandler = require('express-async-handler')
// bcrypt is a package for hashing the password
const bcrypt = require('bcrypt')

// it's commong to label controller function with comments!

// controllers should not use the next params, cuz it is essentially the final function to send a response..

// @desc Get all users
// @route GET /users
// @access Private
const getAllUsers = asyncHandler(async (req, res) => {
    // select iis a method for including or excluding a filed in the doc, lean is just to simplify the data that we'll receive, basically removes the given methods of a doc, so it'll look like a json data
    const users = await User.find({}).select('-password').lean()
    // we use optional after the users just to make sure that the users is there first.
    // if the array is empty, the arrray's length is 0, and that would result in falsy statement
    if (!users?.length) {
        return res.status(400).json({message: 'No users found!'})
    }
    res.json(users)
})

// @desc Create new user
// @route POST /users
// @access Private
const createNewUser = asyncHandler(async (req, res) => {
    const {username, password, roles} = req.body

    // confirm data
    if(!username || !password || !Array.isArray(roles) || !roles.length) {
        return res.status(400).json({message: 'All fields are required!'})
    }

    // check for duplicates
    const duplicate = await User.findOne({username}).lean().exec()
    if (duplicate){
        // status 409 is for 'conflict'
        return res.status(409).json({message: 'Username has already been taken!'})
    }

    // Hash Password
    const hashedPwd = await bcrypt.hash(password, 10) //10 salt rounds

    const userObject = {username, "password":hashedPwd, roles}

    // Create and store new user
    const user = await User.create(userObject)

    if (user) { //successfuly created..
        res.status(201).json({message: `New user ${username} successfuly created!`})
    } else {
        res.status(400).json({message: 'Invalid user data received'})
    }
})

// @desc Update a user
// @route PATCH /users
// @access Private
const updateUser = asyncHandler(async (req, res) => {
    const {id, username, roles, active, password} = req.body

    // confirm data
    if (!id || !username || !Array.isArray(roles) || !roles.length || typeof active !== 'boolean') {
        return res.status(400).json({message: 'All fields are required!'})
    }

    //if you passing something inside the mongoose method, and want to receive a promise, just use exec()
    const user = await User.findById(id).exec()

    if (!user) {
        return res.status(400).json({message: 'User not found!'})
    }

    // Check for duplicates
    const duplicate = await User.findOne({username}).lean().exec()
    // this one basically checks if there's a duplicate, make sure both has the same id, if not, it means we're trying to use a username that has been taken by another user, hence different id.
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json({message: 'Username has already been taken!'})
    }
    
    // update the user
    // just a side note, in mongoose doc, if we try to set a property that doesn'tt exist in the model, it will reject the req
    user.username = username
    user.roles = roles
    user.active = active

    if (password) {
        user.password = await bcrypt.hash(password, 10) //update the user with the new password that has been hashed! 
    }

    // this is the reason why when we use the findById method, we didn't use the lean method, if we did that, the save method in the received user document will not be present.
    const updatedUser = await user.save()

    res.json({message: `${updatedUser.username} updated!`})
})

// @desc Delete a user
// @route DELETE /users
// @access Private
const deleteUser = asyncHandler(async (req, res) => {
    const {id} = req.body

    if (!id) {
        return res.status(400).json({message: 'User ID is required!'})
    }

    const userNote = await Note.findOne({user: id}).lean().exec()
    // if there is no note found, the findOne method will return null
    if (userNote) {
        return res.status(400).json({message: 'Cannot delete user that has assigned notes!'})
    }

    const user = await User.findById(id).exec()
    if (!user) {
        return res.status(400).json({message: 'User not found!'})
    }

    const deletedUser = await user.deleteOne()
    const reply = `Username ${deletedUser.username} with ID ${deletedUser._id} successfuly deleted!`

    res.json({message: reply})
})


module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}