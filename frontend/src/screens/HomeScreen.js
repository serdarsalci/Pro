import React, { useState, useEffect } from 'react'
import Product from '../components/Product'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'

const HomeScreen = () => {
	const [products, setProducts] = useState([])

	// callback function can't be async, thats why create a async function in cb function
	useEffect(() => {
		const fetchProducts = async () => {
			// for this to work dont forget to end proxy in frontend package.json
			const { data } = await axios.get('/api/products/')
			setProducts(data)
		}
		fetchProducts()
	}, [])

	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map(product => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	)
}

export default HomeScreen
