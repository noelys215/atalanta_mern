const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				countInStock: [{ size: String, quantity: Number }],
				name: { type: String, required: true },
				quantity: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				path: { type: String, required: true },
				selectedSize: { type: String, required: true },
				slug: { type: String, required: true },
				product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
			},
		],
		shippingAddress: {
			country: { type: String, required: true },
			address: { type: String, required: true },
			addressCont: { type: String },
			state: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
		},
		itemsPrice: { type: Number, required: true },
		paymentMethod: {
			type: String,
			required: true,
		},
		paymentResult: {
			id: { type: String },
			status: { type: String },
			update_time: { type: String },
			email_address: { type: String },
		},
		taxPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		shippingPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		totalPrice: {
			type: Number,
			required: true,
			default: 0.0,
		},
		isPaid: {
			type: Boolean,
			required: true,
			default: false,
		},
		paidAt: {
			type: Date,
		},
		deliveredAt: {
			type: Date,
		},
		isDelivered: {
			type: Boolean,
			required: true,
			default: false,
		},
		shippedAt: {
			type: Date,
		},
		isShipped: {
			type: Boolean,
			required: true,
			default: false,
		},
	},
	{
		timestamps: true,
	}
);

const Order = mongoose.model('order', orderSchema);

module.exports = Order;
