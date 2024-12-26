// when it resolve it's going to call the next handler, function that takes three parameters
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;