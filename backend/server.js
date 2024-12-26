import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import cors from 'cors';
const port = process.env.PORT;

connectDB(); // Connect to MongoDB

const app = express();

// body parser middlware, to set up the req.body 
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// these two lines of middleware should allow us to get that body data

// setting up cors
app.use(cors());

// Cookie parser middleware
app.use(cookieParser());

// that above will allos us to access request.cookies.jwt

app.get('/', (req, res) => {
  res.send('API is running...');
});
// middlewares
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// we're gonna put paypal route to our backend 
// this is really important , we're gonna send our clientId from our backend, not frontend cause we don't want people to see it.
app.get('/api/config/paypal', (req, res)=> res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))
// after storing the clientId to our env file, we then create a route so paypal can then get that client.

// we're gonna use here errorHandler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))

// concurrently helps us to run the frontend server and the backend server at the same time.
// Devdependencies are not for production.
// "client":"npm start --prefix frontend", it will go first to frontend and then it will do npm start