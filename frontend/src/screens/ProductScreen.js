import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Messsage'
import moment from 'moment'
import {
	getSingleProduct,
	listProductDetails,
	createProductReview,
	test,
} from '../actions/productActions'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

const ProductScreen = ({ history, match }) => {
	const [qty, setQty] = useState(1)
	const [rating, setRating] = useState(0)
	const [comment, setComment] = useState('')
	const [pro, setPro] = useState({})

	const dispatch = useDispatch()

	const productDetails = useSelector(state => state.productDetails)
	let { loading, error, product } = productDetails

	const productReviewCreate = useSelector(state => state.productReviewCreate)
	const {
		success: successProductReview,
		error: errorProductReview,
	} = productReviewCreate

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	if (!product) {
		console.log('no prod in state')
	} else {
		console.log('product var')
	}

	useEffect(() => {
		if (successProductReview) {
			alert('Review Submitted.')
			setRating(0)
			setComment('')
			dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
		}
		dispatch(listProductDetails(match.params.id))
	}, [dispatch, match, successProductReview])

	const addToCartHandler = () => {
		history.push(`/cart/${match.params.id}?qty=${qty}`)
	}

	const submitHandler = e => {
		e.preventDefault()
		dispatch(
			createProductReview(match.params.id, {
				rating,
				comment,
			})
		)
	}

	return (
		<>
			<Link className='btn btn-light my-3' to='/'>
				<i className='fas fa-chevron-left'></i> Go Back
			</Link>
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<>
					<Row>
						<Col lg={6}>
							<Image src={product.image} alt={product.name} fluid rounded />
						</Col>
						<Col lg={6}>
							<Row>
								<Col lg={6} md={12}>
									<ListGroup variant='flush'>
										<ListGroup.Item>
											<h3>{product.name}</h3>
										</ListGroup.Item>
										<ListGroup.Item>
											<Rating
												value={product.rating}
												text={`${product.numReviews} reviews`}
											/>
										</ListGroup.Item>
										<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
									</ListGroup>
								</Col>
								<Col lg={6} md={12}>
									<Card>
										<ListGroup variant='flush'>
											<ListGroup.Item>
												<Row>
													<Col>Price:</Col>
													<Col>
														<strong>${product.price}</strong>
													</Col>
												</Row>
											</ListGroup.Item>
											<ListGroup.Item>
												<Row>
													<Col>Status:</Col>
													<Col>
														{product.countInStock > 0
															? 'In Stock'
															: 'Out of Stock'}
													</Col>
												</Row>
											</ListGroup.Item>
											{product.countInStock > 0 && (
												<ListGroup.Item>
													<Row>
														<Col>Qty</Col>
														<Col>
															<Form.Control
																as='select'
																value={qty}
																onChange={e => setQty(e.target.value)}>
																{[...Array(product.countInStock).keys()].map(
																	x => (
																		<option key={x + 1} value={x + 1}>
																			{x + 1}
																		</option>
																	)
																)}
															</Form.Control>
														</Col>
													</Row>
												</ListGroup.Item>
											)}
											<ListGroup.Item>
												<Button
													onClick={addToCartHandler}
													className='btn-block'
													type='button'
													disabled={product.countInStock <= 0}>
													Add to Cart
												</Button>
											</ListGroup.Item>
										</ListGroup>
									</Card>
								</Col>
							</Row>
							<Row>
								<div style={{ margin: '1rem 2rem' }}>
									<p>
										<strong>Description:</strong> ${product.description}
									</p>
								</div>
							</Row>
						</Col>
					</Row>
					<Row>
						<Col md={6}>
							<h2 style={{ paddingLeft: '1.25rem', paddingTop: '1rem' }}>
								Reviews
							</h2>
							{product.reviews.length === 0 && <Message>No Reviews</Message>}
							<ListGroup variant='flush'>
								{product.reviews.map(review => (
									<ListGroup.Item key={review._id}>
										<Row>
											<Col>
												<strong>{review.name}</strong>
												{'  '}
												<span>{moment(review.createdAt).format('ll')}</span>
											</Col>
											{/* style={{ marginLeft: '6rem' }} */}
											<Col>
												<Rating
													style={{ marginLeft: 'auto' }}
													value={review.rating}
													text={`${review.rating} stars`}
												/>
											</Col>
										</Row>
										<p style={{ marginTop: '0.5rem' }}>{review.comment}</p>
									</ListGroup.Item>
								))}
								<ListGroup.Item>
									<h5>Write a customer review</h5>
									{errorProductReview && (
										<Message variant='danger'>{errorProductReview}</Message>
									)}
									{userInfo ? (
										<Form onSubmit={submitHandler}>
											<Form.Group controlId='rating'>
												{/* <Form.Label>Rating</Form.Label> */}
												<Form.Control
													as='select'
													value={rating}
													onChange={e => setRating(e.target.value)}>
													<option value=''>Select Rating</option>
													<option value='1'>1 - Poor</option>
													<option value='2'>2 - Fair</option>
													<option value='3'>3 - Good</option>
													<option value='4'>4 - Very Good</option>
													<option value='5'>5 - Excellent</option>
												</Form.Control>
											</Form.Group>
											<Form.Group controlId='comment'>
												<Form.Control
													as='textarea'
													row='2'
													placeholder='Write a review'
													value={comment}
													onChange={e =>
														setComment(e.target.value)
													}></Form.Control>
											</Form.Group>
											<Button
												type='submit'
												variant='primary'
												className='btn btn-block'>
												Submit Review
											</Button>
										</Form>
									) : (
										<Message>
											Please <Link to='/login'>Sign in</Link> to write a review
										</Message>
									)}
								</ListGroup.Item>
							</ListGroup>
						</Col>
					</Row>
				</>
			)}
		</>
	)
}

export default ProductScreen
