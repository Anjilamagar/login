import express from 'express'
import connectdb from './config/db.js';
import authroutes from './routes/authroutes.js'

// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");

const app = express();

// app.use(cors());

app.use(express.json());

connectdb();

// app.use("/api/auth", authRoutes);




// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

app.use("/auth", authroutes);


app.listen(5000, () => {
    console.log("Server running on port 5000")
})

