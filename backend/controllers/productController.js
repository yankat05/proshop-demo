import asyncHandler from "../middleware/asyncHandler.js";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public

const getProducts = asyncHandler(async (req, res) => {
  // adding a page size 
  const pageSize = process.env.PAGINATION_LIMIT;
  // we're setting page to the pageNumber that's in the url
  const page = Number(req.query.pageNumber) || 1;
  // we need to get the total number of page, Product.countDocuments() ; it'll give the total number of products

  // using regular expression to match the keyword
  // $options: 'i'; will make it case insensitive
  // that will limit the count
  const keyword = req.query.keyword ? { name: { $regex: req.query.keyword, $options: 'i' } } : {};

  // it'll only match if it matches that keyword.
  const count = await Product.countDocuments({ ...keyword });
  
  

  // we want to find product with that keyword if there is a keyword.
  const products = await Product.find({ ...keyword })
  .limit(pageSize) // it'll only get two
  .skip(pageSize * (page - 1));
  // if we're on the second page , we want to skip the products that are on the first page.
  // res.json(products);
  res.json({products, page, pages: Math.ceil(count / pageSize)});
});

// @desc    Fetch a product
// @route   GET /api/products/:id
// @access  Public

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (product) {
    return res.json(product);
  } else {
    res.status(404);
    throw new Error('Resource not found');
  }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin

const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    category: 'Sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample description',
  })

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   POST /api/products/:id
// @access  Private/Admin

const updateProduct = asyncHandler(async (req, res) => {
  const { name, price, description, image, brand, category, countInStock } = req.body;

  const product = await Product.findById(req.params.id);

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;

    const updatedProduct = await product.save();
    res.json(updateProduct);
  } else {
    res.status(404);
    throw new Error('Ressource not found');
  }

});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin

const deleteProduct = asyncHandler(async (req, res) => {
  
  const product = await Product.findById(req.params.id);

  if (product) {
    await Product.deleteOne({_id: product._id});
    res.status(200).json({ message: 'Product deleted' });
  } else {
    res.status(404);
    throw new Error('Ressource not found');
  }

});


// @desc    Create a new review
// @route   POST /api/products/:id/reviews
// @access  Private
// private ; he must be logged in.

const createProductReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;
  
  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find((review) => review.user.toString() === req.user._id.toString());

    if (alreadyReviewed) {
      res.status(400);
      throw new Error('Product already reviewed');
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating = product.reviews.reduce((acc, review) => acc + review.rating, 0) / product.reviews.length;

    await product.save();
    res.status(201).json({ message: 'Review added' });
  } else {
    res.status(404);
    throw new Error('Ressource not found');
  }

});


// @desc    Get top rated products
// @route   GET /api/products/top
// @access  Public

const getTopProducts = asyncHandler(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});


export { getProducts , getProductById, createProduct, updateProduct, deleteProduct, createProductReview, getTopProducts };
