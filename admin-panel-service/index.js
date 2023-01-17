import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth-route.js";
import usersRoute from "./routes/users-route.js";
import hotelsRoute from "./routes/hotels-route.js";
import roomsRoute from "./routes/rooms-route.js";
import cors from "cors"


const app = express();
const PORT = 3001;

const corsOpts = {
    origin: '*',

    methods: '*',

    allowedHeaders: '*'
};

app.use(cors(corsOpts));

// app.use(
//     cors({
//       origin: 'http://localhost:4200',
//       // Allow follow-up middleware to override this CORS for options
//       preflightContinue: true,
//     }),
//   );

dotenv.config()

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO);
        console.log('Connected to mongoDB')
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on('disconnected', () => {
    console.log('mongoDB disconnected!')
})

//middlewares
app.use(cookieParser());
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/users', usersRoute);
app.use('/api/hotels', hotelsRoute);
app.use('/api/rooms', roomsRoute);

app.use((err, req, res, next) => {

    // res.setHeader('Access-Control-Allow-Origin', '*');
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS',);
    // res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    // res.setHeader('Access-Control-Allow-Credentials', true);

    const errorStatus = err.status || 500;
    const errorMessage = err.message || "Something went wrong!";
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack,
    });
});

app.listen(PORT, () => {
    connect()
    console.log("Connet to backend! Port:" + PORT);
})