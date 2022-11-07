import { createSlice, current } from '@reduxjs/toolkit';
import { createOrder } from '../actions/createOrder';

const initialState = { loading: false, order: {}, error: '' };

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
			state.loading = false;
			state.order = payload;
			console.log(payload);
		},
		[createOrder.rejected]: (state, { payload, error }) => {
			console.log('Order Rejected');
			state.loading = false;
			state.error = payload;
		},
	},
});

export default orderSlice.reducer;
