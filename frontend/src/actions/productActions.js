import axios from 'axios'
import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	GET_SINGLE_PRODUCT,
} from '../constants/productConstants'

export const listProducts = () => async dispatch => {
	try {
		dispatch({ type: PRODUCT_LIST_REQUEST })
		const { data } = await axios.get('/api/products')
		dispatch({
			type: PRODUCT_LIST_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_LIST_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

// experimental
export const getSingleProduct = (products, id) => async (
	dispatch,
	getState
) => {
	try {
		dispatch({ type: GET_SINGLE_PRODUCT, payload: products, id: id })
		console.log(products)
	} catch (error) {
		console.log('getSingleproduct failed')
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
	localStorage.setItem(
		'product',
		JSON.stringify(getState().productList.product)
	)
}

export const listProductDetails = id => async dispatch => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })
		const { data } = await axios.get(`/api/products/${id}`)
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DETAILS_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
