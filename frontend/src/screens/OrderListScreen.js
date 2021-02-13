import React, { useEffect } from 'react'
import moment from 'moment'
import { LinkContainer } from 'react-router-bootstrap'
import { Table, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Messsage'
import Loader from '../components/Loader'
import { listAllOrders } from '../actions/orderActions'
import { PRODUCT_CREATE_RESET } from '../constants/productConstants'

export const OrderListScreen = ({ history }) => {
	const dispatch = useDispatch()
	const orderList = useSelector(state => state.orderList)
	const { loading, error, orders } = orderList

	const userLogin = useSelector(state => state.userLogin)
	const { userInfo } = userLogin

	useEffect(() => {
		if (!userInfo.isAdmin) {
			history.push('/login')
		} else {
			dispatch(listAllOrders())
		}
	}, [dispatch, history, userInfo])

	const deleteHandler = id => {
		// if (window.confirm('Are you sure ?')) {
		// 	dispatch(deleteProduct(id))
		// }
	}

	const createProductHandler = () => {
		//	dispatch(createProduct())
	}

	return (
		<>
			<Row className='align-items-center'>
				<Col>
					<h1>Orders</h1>
					<h2>Exp_OrderListScreen</h2>
				</Col>
				<Col className='text-right'>
					{/* <Button className='my-3' onClick={createProductHandler}>
						<i className='fas fa-plus'></i> Add Product
					</Button> */}
				</Col>
			</Row>
			{/* {loading && <Loader />}
			{error && <Message variant='danger'>{error}</Message>} */}
			{loading ? (
				<Loader />
			) : error ? (
				<Message variant='danger'>{error}</Message>
			) : (
				<Table striped bordered hover responsive className='table-sm'>
					<thead>
						<tr>
							<th>User</th>
							<th>ORD DATE</th>
							<th>Total Price</th>
							<th>Delivered</th>
							<th>PAID</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order._id}>
								<LinkContainer to={`/admin/user/${order.user._id}/edit`}>
									<td className='td-btn'>{order.user.name}</td>
								</LinkContainer>
								<td>{moment(order.createdAt).format('lll')}</td>
								<td>{order.totalPrice}</td>
								<td>
									{order.isDelivered ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isPaid ? (
										<i className='fas fa-check' style={{ color: 'green' }}></i>
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>

								<td>
									<LinkContainer to={`/admin/order/${order._id}/edit`}>
										<Button variant='light' className='btn-sm'>
											<i className='fas fa-edit'></i>
										</Button>
									</LinkContainer>
									<Button
										variant='danger'
										className='btn-sm'
										onClick={() => deleteHandler()}>
										<i className='fas fa-trash'></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	)
}
