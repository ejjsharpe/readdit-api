const express = require('express');
const apiRouter = require('./routes/api');
const { handleCustomErrors, handlePSQLErrors, handle500, routeNotFound } = require('./controllers/errors')
const app = express()
const cors = require('cors')

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
    optionSuccessStatus: 200
}

app.use(express.json())
app.use(cors(corsOptions))




//ROUTES
app.use('/api', apiRouter)
app.all('/*', routeNotFound);


//ERRORS HANDLERS
app.use(handleCustomErrors)
app.use(handlePSQLErrors)
app.use(handle500);




module.exports = app;