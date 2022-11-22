import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async (user: any, { getState, rejectWithValue }: any) => {
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
			const { data } = await axios.put(
				`http://127.0.0.1:5000/api/users/${user._id}`,
				user,
				config
			);
			console.log(data);
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
