const cors = require('cors');
const express = require('express');
const colors = require('color');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');


dotenv.config();
connectDB();
const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan('dev'));

// 
app.use('/api/v1/user', require("./routes/userRoutes"));
app.use('/api/v1/admin', require("./routes/adminRoutes"));
app.use('/api/v1/doctor', require("./routes/doctorRoutes"));
// 
app.listen(8080, (req, res) => {
    console.log("listening on 8080");
})