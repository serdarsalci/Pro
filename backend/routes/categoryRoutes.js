import express from 'express'
import ErrorResponse from '../utils/errorResponse.js'
import { protect, admin } from '../middleware/authMiddleware.js'
import { createCategory } from '../controllers/categoryController.js'

const router = express.Router()

router.route('/').get(protect, admin, createCategory)

export default router

// import express from 'express'
// const router = express.Router()
// import { createCategory } from '../controllers/categoryController.js'
// import ErrorResponse from '../utils/errorResponse.js'
// import { protect, admin } from '../middleware/authMiddleware.js'

// router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders)
// router.route('/myorders').get(protect, getMyOrders)
// router.route('/:id').get(protect, getOrderById)
// router.route('/:id/pay').put(protect, updateOrderToPaid)
// export default router
