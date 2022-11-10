import { createSlice, current } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { createOrder } from '../actions/createOrder';
import { getOrderDetails } from '../actions/getOrderDetails';

const initialState = {
	loading: false,
	order: Cookies.get('orders') || {},
	error: '',
	success: false,
};
export const orderSlice = createSlice({
	name: 'order',
	initialState,
	extraReducers: {
		// Create order reducer ...
		[createOrder.pending]: (state) => {
			console.log('Order Pending');
			state.loading = true;
		},
		[createOrder.fulfilled]: (state, { payload }) => {
			console.log('Order Fulfilled');
			state.order = payload;
			state.loading = false;
		},
		[createOrder.rejected]: (state, { payload, error }) => {
			console.log('Order Rejected');
			state.loading = false;
			state.error = payload;
		},
		// Get order details reducer ...
		[getOrderDetails.pending]: (state) => {
			console.log('Get Order Pending');
			state.loading = true;
		},
		[getOrderDetails.fulfilled]: (state, { payload }) => {
			console.log('Get Order Fulfilled');
			state.order = payload;
			state.loading = false;
		},
		[getOrderDetails.rejected]: (state, { payload, error }) => {
			console.log('Get Order Rejected');
			state.loading = false;
			state.error = payload;
		},
	},
});

export default orderSlice.reducer;
