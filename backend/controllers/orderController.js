const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');

/*  @desc		Create New Order */
/*  @route	POST /api/orders */
/*  @access	Private */
const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400);
		throw new Error('No Order Items');
	} else {
		const order = new Order({
			orderItems,
			user: req.user._id,
			taxPrice,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();
		res.status(201).json(createdOrder);
	}
});

/*  @desc		Get Order By ID */
/*  @route	GET /api/orders/:id */
/*  @access	Private */
const getOrderById = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id).populate({
		path: 'user',
		model: 'User',
		select: 'name email',
	});

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});

module.exports = { addOrderItems, getOrderById };
