// this will be called if no other middleware has handled the request

const notFound = (req, res, next) => {
  const error = new Error(`Not Found -${req.originalUrl}`);
  res.status(404);
  next(error); // it will call the next piece of middleware and passing in the error variable 
}

// to override the default express handler.

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;


  //check for Mongoose bad ObjectId
  if(err.name === 'CastError' && err.kind === 'ObjectId') {
    message = 'Ressource not found';
    statusCode = 404;
  }

  res.status(statusCode).json({
    message,
    stock: process.env.NODE_ENV === 'production' ? 'p' : err.stack,
  });
};

export { notFound, errorHandler };

// to use this , we have to go to server.js