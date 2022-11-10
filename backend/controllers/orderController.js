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

/*  @desc		Update to paid */
/*  @route	GET /api/orders/:id/pay */
/*  @access	Private */
const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body._id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address,
		};

		const updatedOrder = await order.save();
		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error('Order Not Found');
	}
});

/*  @desc		Get User Oder */
/*  @route	GET /api/orders/myorders */
/*  @access	Private */
const getMyOrders = asyncHandler(async (req, res) => {
	const orders = await Order.find({ user: req.user._id });
	res.json(orders);
});

module.exports = { addOrderItems, getOrderById, updateOrderToPaid, getMyOrders };
