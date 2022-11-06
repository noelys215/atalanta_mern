import Cookies from 'js-cookie';
import { createSlice, current } from '@reduxjs/toolkit';
import { registerUser } from '../actions/userActions';
import { loginUser } from '../actions/loginAction';
import { getUserProfile } from '../actions/getUserProfile';
import { updateUserProfile } from '../actions/updateUserProfile';

const initialState = {
	cart: {
		cartItems: Cookies.get('cartItems') ? JSON.parse(Cookies.get('cartItems')) : [],
		shippingAddress: Cookies.get('shippingAddress')
			? JSON.parse(Cookies.get('shippingAddress'))
			: {},
		paymentMethod: Cookies.get('paymentMethod') ? Cookies.get('paymentMethod') : '',
	},
	userInfo: Cookies.get('userInfo') ? JSON.parse(Cookies.get('userInfo')) : null,
};

export const userSlice = createSlice({
	name: 'userInfo',
	initialState,
	reducers: {
		// registerUser: (state, action) => {
		// 	return { ...state, userInfo: action.payload };
		// },
		// loginUser: (state, action) => {
		// 	return { ...state, userInfo: action.payload };
		// },
		logoutUser: (state, action) => {
			Cookies.remove('userInfo');
			Cookies.remove('cartItems');
			Cookies.remove('shippingAddress');
			Cookies.remove('paymentMethod');
			return {
				...state,
				userInfo: null,
				cart: { cartItems: [], shippingAddress: {} },
			};
		},
	},
	extraReducers: {
		// register user
		[registerUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[registerUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.success = true; // registration successful
		},
		[registerUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// login user
		[loginUser.pending]: (state) => {
			state.loading = true;
			state.error = null;
		},
		[loginUser.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload; // login successful
		},
		[loginUser.rejected]: (state, { payload }) => {
			state.loading = false;
			state.error = payload;
		},
		// get user reducer ...
		[getUserProfile.pending]: (state) => {
			state.loading = true;
		},
		[getUserProfile.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
		},
		[getUserProfile.rejected]: (state, { payload }) => {
			state.loading = false;
		},
		// update user reducer ...
		[updateUserProfile.pending]: (state) => {
			state.loading = true;
		},
		[updateUserProfile.fulfilled]: (state, { payload }) => {
			state.loading = false;
			state.userInfo = payload;
		},
		[updateUserProfile.rejected]: (state, { payload }) => {
			state.loading = false;
		},
	},
});

export const { logoutUser } = userSlice.actions;

export default userSlice.reducer;
