import express from 'express'
const router = express.Router()
import {
	getProductById,
	getProducts,
} from '../controllers/productController.js'
import ErrorResponse from '../utils/errorResponse.js'

router.route('/').get(getProducts)
router.route('/:id').get(getProductById)

export default router
