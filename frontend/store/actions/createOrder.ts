import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createOrder = createAsyncThunk(
	'order/createOrder',
	async (order: any, { getState, rejectWithValue }: any) => {
		try {
			// get user data from store
			const {
				userInfo: { userInfo },
			} = getState();

			// configure authorization header with user's token
			const config = {
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${userInfo.token}`,
				},
			};

			// create post request with order data
			const { data }: any = await axios
				.post(`http://127.0.0.1:5000/api/orders`, order, config)
				.catch((err) => console.log(err.response.data));

			return data;
		} catch (error: any) {
			if (error.response && error.response.data.message) {
				return rejectWithValue(error.response.data.message);
			} else {
				return rejectWithValue(error.message);
			}
		}
	}
);
