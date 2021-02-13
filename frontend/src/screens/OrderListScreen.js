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
		if (userInfo.isAdmin && userInfo) {
			dispatch(listAllOrders())
		} else {
			history.push('/login')
		}
	}, [dispatch, history, userInfo])

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
							<th>TOTAL PRICE</th>
							<th>DELIVERED</th>
							<th>PAID</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{orders.map(order => (
							<tr key={order._id}>
								<LinkContainer to={`/admin/user/${order.user._id}/edit`}>
									<td className='td-btn'>{order.user && order.user.name}</td>
								</LinkContainer>
								<td>{moment(order.createdAt).format('lll')}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isDelivered ? (
										order.isDelivered.substring(0, 10)
									) : (
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										/* <i className='fas fa-check' style={{ color: 'green' }}></i> */
										<i className='fas fa-times' style={{ color: 'red' }}></i>
									)}
								</td>

								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant='light' className='btn-sm'>
											Details
										</Button>
									</LinkContainer>
									<Button variant='danger' className='btn-sm'>
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
