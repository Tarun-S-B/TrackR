// This only starts the server
import dotenv from 'dotenv';
import app from './src/app.js';

dotenv.config();
const PORT = process.env.BACKEND_PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})








// import express from 'express';
// import cors from 'cors';
// import { PrismaClient } from '@prisma/client';
// import dotenv from 'dotenv'

// const prisma = new PrismaClient();
// const app = express();
// dotenv.config();

// app.use(cors());
// app.use(express.json());

// const PORT = process.env.BACKEND_PORT;

// app.post('/api/newexpense', async (req, res) => {
//     console.log("Received expense data:", req.body);
//     // res.status(200).json({ message: "Expense data received successfully" });

//     res.status(200);
//     res.setHeader('Content-Type', 'application/json');
//     res.send(JSON.stringify({ message: "Expense data received successfully" }));
// })

// app.listen(PORT, ()=> {
//     console.log(`Server running on port: ${PORT}`);
// });
