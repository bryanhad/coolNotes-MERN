const express = require('express')
const app = express()
const path = require('path')
const {logger} = require('./middleware/logger')
const PORT = process.env.PORT || 3500

// log every incoming request to logs dir in a reqLog.log file
app.use(logger)

// middle ware to parse the incoming json from req, to a js object
app.use(express.json())

// fyi, app.use is a built in method by express to call a middleware. the function below is a middleware to get the css file inside the public folder, it basically will serve all static assets inside the public folder!
app.use('/', express.static(path.join(__dirname, 'public')))

// 
app.use('/' , require('./routes/root'))

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

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
})
