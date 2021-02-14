import express from 'express'
const router = express.Router()
import {
	addOrderItems,
	getOrderById,
	updateOrderToPaid,
	updateOrderToDelivered,
	updateOrderToNotDelivered,
	getMyOrders,
	getAllOrders,
} from '../controllers/orderController.js'
import ErrorResponse from '../utils/errorResponse.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems).get(protect, admin, getAllOrders)
router.route('/myorders').get(protect, getMyOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToPaid)
router
	.route('/:id/deliver')
	.put(protect, admin, updateOrderToDelivered)
	.patch(protect, admin, updateOrderToNotDelivered)
export default router
