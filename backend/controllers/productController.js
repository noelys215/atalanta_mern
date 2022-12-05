const asyncHandler = require('express-async-handler');
const Product = require('../models/productModel');

/*  @desc FETCH ALL PRODUCTS */
/*  @route GET /api/products */
/*  @access Public */
const getProducts = asyncHandler(async (req, res) => {
	const products = await Product.find({});
	res.json(products);
});

/*  @desc FETCH SINGLE PRODUCT */
/*  @route GET /api/products/:id */
/*  @access Public */
const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

/*  @desc DELETE SINGLE PRODUCT */
/*  @route DELETE /api/products/:id */
/*  @access PRIVATE/ADMIN */
const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await product.remove();
		res.json({ message: 'Product Removed' });
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

/*  @desc CREATE SINGLE PRODUCT */
/*  @route POST /api/products/ */
/*  @access PRIVATE/ADMIN */
const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		user: 'req.user._id',
		name: 'Sample Name',
		price: 0,
		category: 'shirts',
		department: 'woman',
		brand: 'Nike',
		color: 'Black',
		description: 'N/A',
		inventory: [
			{ quantity: 5, size: 'XS' },
			{ quantity: 4, size: 'SM' },
			{ quantity: 3, size: 'MD' },
		],
		image: ['/images/sample.jpg'],
	});

	const createdProduct = await product.save();
	res.status(201).json(createdProduct);
});

/*  @desc UPDATE SINGLE PRODUCT */
/*  @route PUT /api/products/:id */
/*  @access PRIVATE/ADMIN */
const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, category, department, brand, color, description, inventory, image, slug } =
		req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.category = category;
		product.department = department;
		product.brand = brand;
		product.color = color;
		product.description = description;
		product.inventory = inventory;
		product.image = image;
		product.slug = slug;

		const updatedProduct = await product.save();
		res.json(updatedProduct);
	} else {
		res.status(404);
		throw new Error('Product Not Found');
	}
});

module.exports = { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
