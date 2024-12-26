import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
// we're gonna have two functions in this file, protect which is going to allow us to protect routes for users that are registered, for instance to get userprofile , you have to to be logged in.
// we'll also have an admin middleware function for users that are admins , for instance , to get all orders you have to be an admin for that.

// you have to make sure that at the end , you add next , because , it will say , okay, we're done here, move on to the next middleware.

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from cookie
  token = req.cookies.jwt;

  if (token) {
    // in the try , we're gonna decode the token to get the user ID
    // we decoded with jwt.verify, verify takes in the token and the secret
    try {
      // this decoded is now an object containing the user ID
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select('-password');
      next();
      // it means all fields without the password.
      // then we put that user to the req.user
      // this .user object will be on the request object in all of our routes. and it'll be the user that's logged in
    } catch (error) {
      console.log(error)
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
})

// function middleware will take , req, res, next

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized as admin');
  }
}


// to use these middleware, we're gonna pass it into the route file

export { protect, admin };