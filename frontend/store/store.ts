import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import productsReducer from './slices/productsSlice';
import userReducer from './slices/userSlice';
import paymentReducer from './slices/paymentSlice';
import orderReducer from './slices/orderSlice';
import orderPayReducer from './slices/orderPaySlice';
import orderHistoryReducer from './slices/orderHistorySlice';

export const store = configureStore({
	reducer: {
		cart: cartReducer,
		products: productsReducer,
		userInfo: userReducer,
		payment: paymentReducer,
		order: orderReducer,
		orderPay: orderPayReducer,
		orderHistory: orderHistoryReducer,
	},
	devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
