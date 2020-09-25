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

app.use('/api/auth', authRoutes);
app.use('/api/query', queryRoutes);
app.use('/api/response', responseRoutes);

app.use(errorHandler);
app.listen(process.env.PORT || 5000);