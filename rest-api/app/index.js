import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import routes from './routes/index.js';

const app = express();

app.use(express.json());

const PORT = process.env.NODE_PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT || 3000}`)
})

// Database Connection
mongoose.connect(`mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`)
const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
})

db.once('connected', () => {
    console.log('Database connected');
})

// Routes
app.use('/api', routes);