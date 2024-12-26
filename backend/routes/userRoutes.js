// we're gonna connect our functions from usercontroller to our useroutes


import express from 'express';
const router = express.Router();
import { 
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUsersByID,
  updateUser, 
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

// all of these are connected to /api/users
router.route('/').post(registerUser).get(protect, admin, getUsers);
router.post('/logout', logoutUser);
router.post('/login', authUser);
// if we login , that means that there's a cookie, if we logout , the cookie will be cleared.
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);
router.route('/:id').delete(protect, admin, deleteUser).get(protect, admin, getUsersByID).put(protect, admin, updateUser);
// since we only have one method to log like we only have a post request to log out, we're not doing a get or put or whatever, instead of doing .get or post ,we use router('/logout', then the function we want to fire off after we hit this route)
export default router;

