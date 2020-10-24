const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('../config/dbconn');
const errorHandler = require('./middleware/errorHandler')

dotenv.config({ path: './config/config.env' });
const authRoutes = require('./routes/auth');
const queryRoutes = require('./routes/query');
const responseRoutes = require('./routes/response');

connectDB();
const app = express();
app.use(express.json());

// handle CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/response', responseRoutes);

// app.use(errorHandler);

// handle 404
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        msg: '404! Nothing Found!'
    })
})

app.listen(process.env.PORT || 5000);