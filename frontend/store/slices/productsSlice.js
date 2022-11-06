import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
	const { data } = await axios.get(`http://127.0.0.1:5000/api/products`);
	console.log(data);
	return data;
});

const initialState = { loading: false, products: [], error: '' };

export const productSlice = createSlice({
	name: 'products',
	initialState,
	extraReducers: {
		[fetchProducts.pending]: (state) => {
			state.loading = true;
		},
		[fetchProducts.fulfilled]: (state, action) => {
			state.loading = 'Fulfilled';
			state.products = action.payload;
		},
		[fetchProducts.rejected]: (state, action) => {
			state.loading = false;
			state.error = 'Error occurred';
		},
	},
});

export default productSlice.reducer;
