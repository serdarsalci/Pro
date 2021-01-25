import express from 'express'
const router = express.Router()
import { authUser } from '../controllers/userController.js'
import ErrorResponse from '../utils/errorResponse.js'

router.post('/login', authUser)
export default router
