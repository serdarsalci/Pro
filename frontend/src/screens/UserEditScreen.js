import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Messsage'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { getUserDetails } from '../actions/userActions'

const UserEditScreen = ({ match, history }) => {
	const userId = match.params.id

	const [email, setEmail] = useState('')
	const [name, setName] = useState('')
	const [isAdmin, setIsAdmin] = useState(false)

	const dispatch = useDispatch()

	const userDetails = useSelector(state => state.userDetails)
	const { loading, error, user } = userDetails

	useEffect(() => {
		if (!user.name || user._id !== userId) {
			dispatch(getUserDetails(userId))
		} else {
			setName(user.name)
			setEmail(user.email)
			setIsAdmin(user.isAdmin)
		}
	}, [user, userId, dispatch])

	const submitHandler = e => {
		e.preventDefault()
	}

	return (
		<>
			<Link to='/admin/userList' className='btn btn-light my-3'>
				<i className='fas fa-chevron-left'></i>
				{'  '}Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>
				{loading ? (
					<Loader />
				) : error ? (
					<Message variant='danger'>{error}</Message>
				) : (
					<Form onSubmit={submitHandler}>
						<Form.Group controlId='name'>
							<Form.Label>Name</Form.Label>
							<Form.Control
								type='name'
								placeholder='Enter name'
								value={name}
								onChange={e => setName(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='email'>
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type='email'
								placeholder='Enter Email'
								value={email}
								onChange={e => setEmail(e.target.value)}></Form.Control>
						</Form.Group>
						<Form.Group controlId='isAdmin'>
							<Form.Check
								type='checkbox'
								label='Is Admin?'
								checked={isAdmin}
								onChange={e => setIsAdmin(e.target.checked)}></Form.Check>
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

export default UserEditScreen
