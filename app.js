const express = require('express');
const apiRouter = require('./routes/api');
const { handleCustomErrors, handlePSQLErrors, handle500, routeNotFound } = require('./controllers/errors')
const app = express()
const cors = require('cors')

app.use(cors())
app.options('*', cors())
app.use(express.json())





//ROUTES
app.use('/api', apiRouter)
app.all('/*', routeNotFound);


//ERRORS HANDLERS
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handle500);




module.exports = app;