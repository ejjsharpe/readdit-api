const express = require('express');
const apiRouter = require('./routes/api');
const { handleCustomErrors } = require('./controllers/errors')
const app = express()

app.use(express.json())

//ROUTES
app.use('/api', apiRouter)


//ERRORS HANDLERS
app.use(handleCustomErrors)




module.exports = app;