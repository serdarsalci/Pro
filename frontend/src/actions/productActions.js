import axios from 'axios'
import store from '../store'
import {
	PRODUCT_DETAILS_FAIL,
	PRODUCT_DETAILS_REQUEST,
	PRODUCT_DETAILS_SUCCESS,
	PRODUCT_LIST_FAIL,
	PRODUCT_LIST_REQUEST,
	PRODUCT_LIST_SUCCESS,
	GET_SINGLE_PRODUCT,
	PRODUCT_DELETE_SUCCESS,
	PRODUCT_DELETE_REQUEST,
	PRODUCT_DELETE_FAIL,
	PRODUCT_CREATE_SUCCESS,
	PRODUCT_CREATE_REQUEST,
	PRODUCT_CREATE_FAIL,
	PRODUCT_CREATE_RESET,
	PRODUCT_UPDATE_SUCCESS,
	PRODUCT_UPDATE_REQUEST,
	PRODUCT_UPDATE_FAIL,
	PRODUCT_UPDATE_RESET,
	TEST,
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
export const getSingleProduct = id => async (dispatch, getState) => {
	try {
		dispatch({ type: PRODUCT_DETAILS_REQUEST })

		const { products } = store.getState().productList

		const product = products.find(pro => pro._id === id)
		console.log(product)

		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: product,
		})
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

export const test = () => async dispatch => {
	dispatch({
		type: TEST,
	})
}

export const deleteProduct = id => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_DELETE_REQUEST,
		})
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		await axios.delete(`/api/products/${id}`, config)
		dispatch({
			type: PRODUCT_DELETE_SUCCESS,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_DELETE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}

export const createProduct = () => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_CREATE_REQUEST,
		})
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.post(`/api/products`, {}, config)
		dispatch({
			type: PRODUCT_CREATE_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_CREATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
export const updateProduct = product => async (dispatch, getState) => {
	try {
		dispatch({
			type: PRODUCT_UPDATE_REQUEST,
		})
		const {
			userLogin: { userInfo },
		} = getState()

		const config = {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${userInfo.token}`,
			},
		}
		const { data } = await axios.put(
			`/api/products/${product._id}`,
			product,
			config
		)
		dispatch({
			type: PRODUCT_UPDATE_SUCCESS,
			payload: data,
		})
		dispatch({
			type: PRODUCT_DETAILS_SUCCESS,
			payload: data,
		})
	} catch (error) {
		dispatch({
			type: PRODUCT_UPDATE_FAIL,
			payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
		})
	}
}
