import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Messsage'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'

const ProductEditScreen = ({ match, history }) => {
	const productId = match.params.id

	const [name, setName] = useState('')
	const [price, setPrice] = useState('')
	const [image, setImage] = useState('')
	const [brand, setBrand] = useState('')
	const [category, setCategory] = useState('')
	const [countInStock, setCountInStock] = useState(0)
	const [description, setDescription] = useState('')
	const [uploading, setUploading] = useState(false)

	const dispatch = useDispatch()

	const productDetails = useSelector(state => state.productDetails)
	const { loading, error, product } = productDetails

	const productUpdate = useSelector(state => state.productUpdate)
	const {
		loading: loadingUpdate,
		error: errorUpdate,
		success: successUpdate,
	} = productUpdate

	useEffect(() => {
		if (successUpdate) {
			dispatch({ type: PRODUCT_UPDATE_RESET })
			// dispatch({ type: PRODUCT_DETAILS_RESET })
			history.push('/admin/productlist')
		} else {
			if (!product.name || product._id !== productId) {
				dispatch(listProductDetails(productId))
			} else {
				setName(product.name)
				setPrice(product.price)
				setImage(product.image)
				setBrand(product.brand)
				setCategory(product.category)
				setCountInStock(product.countInStock)
				setDescription(product.description)
			}
		}
	}, [dispatch, history, productId, product, successUpdate])

	const uploadFileHandler = async e => {
		const file = e.target.files[0]
		const formData = new FormData()
		formData.append('image', file)
		setUploading(true)

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			}

			const { data } = await axios.post('/api/upload', formData, config)
			setImage(data)
			setUploading(false)
		} catch (error) {
			console.error(error)
			setUploading(true)
		}
	}

	const submitHandler = e => {
		e.preventDefault()
		dispatch(
			updateProduct({
				_id: productId,
				name,
				price,
				brand,
				description,
				countInStock,
				category,
				image,
			})
		)
	}

	return (
		<>
			<Link to='/admin/productlist' className='btn btn-light my-3'>
				<i className='fas fa-chevron-left'></i>
				{'  '}Go Back
			</Link>
			<FormContainer>
				{loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
				<h1>Edit Product</h1>
				{/* {loadingUpdate && <Loader />}
				{errorUpdate && <Message variant='danger'>{errorUpdate}</Message>} */}
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={e => submitHandler(e)}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={e => setName(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter price'
								value={price}
								onChange={e => setPrice(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='image'>
							<Form.Control
								type='text'
								placeholder='Image url'
								value={image}
								onChange={e => setImage(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.File
							id='image-file'
							label='Choose file'
							custom
							onChange={uploadFileHandler}>
							{loading && <Loader />}
						</Form.File>

						<Form.Group controlId='countInStock'>
							<Form.Label>Count In Stock</Form.Label>
							<Form.Control
								type='number'
								placeholder='Enter Count In Stock'
								value={countInStock}
								onChange={e => setCountInStock(e.target.value)}></Form.Control>
						</Form.Group>

						<Form.Group controlId='category'>
							<Form.Control
								type='text'
								placeholder='Category'
								value={category}
								onChange={e => setCategory(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='brand'>
							<Form.Control
								type='text'
								placeholder='brand'
								value={brand}
								onChange={e => setBrand(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='description'>
							<Form.Control
								type='text'
								placeholder='Description'
								value={description}
								onChange={e => setDescription(e.target.value)}></Form.Control>
						</Form.Group>

						<Button type='submit' variant='primary'>
							Update
						</Button>
					</Form>
				)}

				{/* <Row className='py-3'>
					<Col>
						Have an Account ?{' '}
						<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>
							Login
						</Link>
					</Col>
				</Row> */}
			</FormContainer>
		</>
	)
}

export default ProductEditScreen
