const express = require('express');
const dotenv = require('dotenv');
const xss = require('xss-clean');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const connectDB = require('../config/dbconn');
const errorHandler = require('./middleware/errorHandler')

dotenv.config({ path: './config/config.env' });
const authRoutes = require('./routes/auth');
const queryRoutes = require('./routes/query');
const responseRoutes = require('./routes/response');

connectDB();
const app = express();
app.use(express.json());
app.use(xss())
app.use(helmet())
app.use(mongoSanitize())

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
// if (process.env.NODE_ENV === 'production') {
//     // handle static folder
//     app.use(express.static(`${__dirname}/public/`))
//         // handle SPA
//     app.get(/.*/, (req, res) => res.sendFile(`${__dirname}/public/index.html`))
// }
// // handle 404
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        msg: '404! Nothing Found!'
    })
})



app.listen(process.env.PORT || 5000);