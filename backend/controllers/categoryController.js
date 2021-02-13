import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc    Create a product
// @route   POST/api/category
// @access  Public/Admin
export const createCategory = asyncHandler(async (req, res) => {
	const { name, description } = req.body
	const category = new Category({
		name: 'Sample cateogory',
		description: 'Dairy products',
	})

	const createdCategory = await category.save()
	res.status(201).json(createdCategory)
})
