import express from 'express'
const router = express.Router()
import { addOrderItems } from '../controllers/orderController.js'
import ErrorResponse from '../utils/errorResponse.js'
import { protect } from '../middleware/authMiddleware.js'

router.route('/').post(protect, addOrderItems)
export default router
