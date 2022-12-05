import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const deleteProduct = createAsyncThunk(
	'products/deleteProduct',
	async (id: string, { getState, rejectWithValue }: any) => {
		try {
			// get user data from store
			const {
				userInfo: { userInfo },
			} = getState();
			// configure authorization header with user's token
			const config = {
				headers: { Authorization: `Bearer ${userInfo.token}` },
			};

			await axios.delete(`http://127.0.0.1:5000/api/products/${id}`, config);
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
