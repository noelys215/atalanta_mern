const asyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

/*  @desc Auth User & Get Token */
/*  @route POST /api/users */
/*  @access Public */
const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	const user = await User.findOne({ email });

	if (user && (await user.matchPassword(password))) {
		return res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			token: generateToken(user._id),
			telephone: user.telephone,
			country: user.country,
			address: user.address,
			addressCont: user.addressCont,
			state: user.state,
			city: user.city,
			postalCode: user.postalCode,
		});
	} else {
		res.status(401);
		throw new Error('Invalid email or password');
	}
});

/*  @desc Register New User */
/*  @route POST /api/users */
/*  @access Public */
const registerUser = asyncHandler(async (req, res) => {
	const config = ({
		firstName,
		lastName,
		email,
		password,
		telephone,
		country,
		address,
		addressCont,
		state,
		city,
		postalCode,
	} = req.body);

	const userExists = await User.findOne({ email });

	if (userExists) {
		res.status(400);
		throw new Error('User Already Exists');
	}

	const user = await User.create(config);

	if (user) {
		res.status(201).json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			telephone: user.telephone,
			token: generateToken(user._id),
			country: user.country,
			address: user.address,
			addressCont: user.addressCont,
			state: user.state,
			city: user.city,
			postalCode: user.postalCode,
		});
	} else {
		res.status(400);
		throw new Error('Invalid User Data');
	}
});

/*  @desc Get user profile */
/*  @route GET /api/users/profile */
/*  @access Private */
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		return res.json({
			_id: user._id,
			firstName: user.firstName,
			lastName: user.lastName,
			email: user.email,
			isAdmin: user.isAdmin,
			telephone: user.telephone,
			country: user.country,
			address: user.address,
			addressCont: user.addressCont,
			state: user.state,
			city: user.city,
			postalCode: user.postalCode,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found'.bgBrightRed);
	}
});

/*  @desc Update user profile */
/*  @route PUT /api/users/profile */
/*  @access Private */
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		if (req.body.password) {
			user.password = req.body.password;
		}
		user.email = req.body.email || user.email;
		user.telephone = req.body.telephone || user.telephone;
		user.country = req.body.country || user.country;
		user.address = req.body.address || user.address;
		user.addressCont = req.body.addressCont || user.addressCont;
		user.state = req.body.state || user.state;
		user.city = req.body.city || user.city;
		user.postalCode = req.body.postalCod || user.postalCode;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			token: generateToken(updatedUser._id),
			telephone: updatedUser.telephone,
			country: updatedUser.country,
			address: updatedUser.address,
			addressCont: updatedUser.addressCont,
			state: updatedUser.state,
			city: updatedUser.city,
			postalCode: updatedUser.postalCode,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found'.bgBrightRed);
	}
});

/*  @desc Get All Users */
/*  @route PUT /api/users/ */
/*  @access Private/Admin */
const getUsers = asyncHandler(async (req, res) => {
	const users = await User.find({});
	res.json(users);
});

/*  @desc Delete User */
/*  @route DELETE /api/users/:id */
/*  @access Private/Admin */
const deleteUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		await user.remove();
		res.json({ message: `User ${user.firstName} ${user.lastName} removed` });
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

/*  @desc Get A User By Id */
/*  @route GET /api/users/:id */
/*  @access Private/Admin */
const getUserById = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id).select('-password');

	if (user) {
		res.json(user);
	} else {
		res.status(404);
		throw new Error('User Not Found');
	}
});

/*  @desc Update User */
/*  @route PUT /api/users/:id */
/*  @access Private/Admin */
const updateUser = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.firstName = req.body.firstName || user.firstName;
		user.lastName = req.body.lastName || user.lastName;
		user.isAdmin = req.body.isAdmin;
		user.email = req.body.email || user.email;
		user.telephone = req.body.telephone || user.telephone;
		user.country = req.body.country || user.country;
		user.address = req.body.address || user.address;
		user.addressCont = req.body.addressCont || user.addressCont;
		user.state = req.body.state || user.state;
		user.city = req.body.city || user.city;
		user.postalCode = req.body.postalCod || user.postalCode;

		const updatedUser = await user.save();

		res.json({
			_id: updatedUser._id,
			firstName: updatedUser.firstName,
			lastName: updatedUser.lastName,
			email: updatedUser.email,
			isAdmin: updatedUser.isAdmin,
			telephone: updatedUser.telephone,
			country: updatedUser.country,
			address: updatedUser.address,
			addressCont: updatedUser.addressCont,
			state: updatedUser.state,
			city: updatedUser.city,
			postalCode: updatedUser.postalCode,
		});
	} else {
		res.status(404);
		throw new Error('User Not Found'.bgBrightRed);
	}
});

module.exports = {
	authUser,
	getUserProfile,
	registerUser,
	updateUserProfile,
	getUsers,
	deleteUser,
	getUserById,
	updateUser,
};
