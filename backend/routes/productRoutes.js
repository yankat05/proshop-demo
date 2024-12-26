import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';

// we're gonna link /api/products from server.js to this file

// it's gonna be /api/products/whatever you have here
// router.get('/', asyncHandler(async  (req, res) => {
//   // it should get all the products Product.find({})
//   const products = await Product.find({});
//   res.json(products);
// }));

// router.get('/:id', asyncHandler(async (req, res) => {
//   const product = await Product.findById(req.params.id);

//   if (product) {
//     return res.json(product);
//   } else {
//     res.status(404);
//     throw new Error('Resource not found');
//   }
  
// }))
// if the product is not found , we use res.status to give the status then we use  .json or .send to send the response

// on '/' , if you use get , it should do something for ex getting data by calling getProducts
router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;

