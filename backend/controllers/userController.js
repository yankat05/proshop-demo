// when we use mongoose methods inside an async function, we have to use asyncHandler
import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
// @desc    Auth user & get token
// @route   POST /api/users/token
// @access  Public


const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  // since i added this method onto the user schema, i can access that method on the user object
  if (user && (await user.matchPassword(password))) {
    // .sign will create the token , it will take in , first an object with a payload what we wanna send in the payload, second the secret, third the expired date for the token
    // it's just gonna put it in token.
    generateToken(res, user._id);
    // the token is gonna get stored here , then it will get sent with every subsequent request after we log in

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @desc    Register user
// @route   GET /api/users
// @access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  // checking if user exist
  if (userExists) {
    res.status(400); // client error
    throw new Error('User already exists');
  }

  // if user doesn't exist
  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    generateToken(res, user._id);
    // 201 means everything's good , something was created
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  } 

});


// @desc    Logout user / clear cookie
// @route   POST /api/users/logout
// @access  Private
// logout means getting rid of JWT cookie
const logoutUser = asyncHandler(async (req, res) => {
  // this is how we can clear the cookie
  // res.cookie method takes in , the name of the cookie , the value of the cookie we want to set, and some options
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private

const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  // when we logged in , we can access to the user , using req.user

  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    update user profile
// @route   PUT /api/users/profile
// @access  Private

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    // the user that's in the database
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    // user.save() that will return the user data to updatedUser variable.

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// @desc    Get user 
// @route   GET /api/users
// @access  Private/Admin

const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin

const getUsersByID = asyncHandler(async (req, res) => {
  res.send('get users by id');
});


// @desc    Delete users
// @route   DELETE /api/users/:id
// @access  Private/Admin

const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete users');
});


// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin

const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersByID,
  updateUser,
}


// cookie-parser will allow us to parse the cookie from the request object