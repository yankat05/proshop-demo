import path from 'path';
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
import uploadRoutes from './routes/uploadRoutes.js';
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


// middlewares
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);
// we're gonna put paypal route to our backend 
// this is really important , we're gonna send our clientId from our backend, not frontend cause we don't want people to see it.
app.get('/api/config/paypal', (req, res)=> res.send({ clientId: process.env.PAYPAL_CLIENT_ID }))
// after storing the clientId to our env file, we then create a route so paypal can then get that client.

// Make uploads folder static
const __dirname = path.resolve(); // Set __dirname to current directory
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// the first argument is the filename, and then we make it static by specifying the location of that folder

console.log(path.join(__dirname, '/uploads'))

// we check to see if we're on development mode or production

if (process.env.NODE_ENV === 'production') {
  // set static folder
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  // any route that is not api will be redirected to index.html
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running...');
  });
}

// we're gonna use here errorHandler
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server running on port ${port}`))

// concurrently helps us to run the frontend server and the backend server at the same time.
// Devdependencies are not for production.
// "client":"npm start --prefix frontend", it will go first to frontend and then it will do npm start