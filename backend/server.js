require('dotenv').config()
const express = require('express')
const app = express()
const path = require('path')
const {logger, logEvents} = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3100

connectDB()
// log every incoming request to logs dir in a reqLog.log file
app.use(logger)
app.use(cors(corsOptions))
// middle ware to parse the incoming json from req, to a js object
app.use(express.json())
// parse cookie that the api receive from the req
app.use(cookieParser())
// fyi, app.use is a built in method by express to call a middleware. the function below is a middleware to get the css file inside the public folder, it basically will serve all static assets inside the public folder!
app.use('/', express.static(path.join(__dirname, 'public')))

app.use('/' , require('./routes/root'))
// route for users end point
app.use('/users', require('./routes/userRoutes'))
// route for notes end point
app.use('/notes', require('./routes/noteRoutes'))

// catch all route, basically a 404 page..
// app.all() is a function to route all types of http requests e.g. post,get,put,delete,etc.. we use path '*' to accept all paths that a user may request to
app.all('*', (req, res) => {
    res.status(404)
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'))
    } else if (req.accepts('json')) {
        res.json({message: '404 Not Found'})
    } else {
        res.type('txt').send('404 Not Found')
    }
})

// catches error, if there is an error, log the error to the logs dir in a errLog.log file
app.use(errorHandler)

// mongoose connection once is just a listener that listens once for an event. in this case, I specifically tell it to listen to the open event!
mongoose.connection.once('open', () => {
    console.log('Connected to mongoDB!')
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})