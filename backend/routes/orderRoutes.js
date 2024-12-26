// we're gonna connect our functions from ordercontroller to our orderroutes

import express from 'express';
const router = express.Router();
import { 
  addOrderItems,
  getMyOrders,
  getOrderById,
  updateOrderToPaid,
  updateOrderToDelivered,
  getOrders, 
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'

// all of these are connected to /api/orders
// protect is means if a user is registerd
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/mine').get(protect, getMyOrders);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered)

  
export default router;

