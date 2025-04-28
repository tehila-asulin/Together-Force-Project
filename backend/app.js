require("dotenv").config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const bodyParser = require('body-parser');

const volunteerRoutes = require('./routes/volunteerRoutes');
const volunteeringRoutes = require('./routes/volunteeringRoutes');
const organizationRoutes = require('./routes/organizationRoutes');

const corsOptions = require("./config/corsOptions");
const connectDB = require("./config/dbConn");

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json()); 

// Routes
app.use('/api/volunteerRoutes', volunteerRoutes);
app.use('/api/volunteeringRoutes', volunteeringRoutes);
app.use('/api/organizationRoutes', organizationRoutes);
app.use("/api/auth", require("./routes/authRoutes"));

// Connect to DB and start server
connectDB();

mongoose.connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    app.listen(PORT, () => {
        console.log(` Server running on port ${PORT}`);
    });
})
.catch((error) => {
    console.log(error.message);
});
