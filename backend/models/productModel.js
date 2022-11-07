const mongoose = require('mongoose');
const mongooseSlugPlugin = require('mongoose-slug-plugin');

const productSchema = mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		name: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		category: {
			type: String,
			required: true,
		},
		department: {
			type: String,
			required: true,
		},
		brand: {
			type: String,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		slug: {
			type: String,
			slug: 'name',
		},
		image: [String],
		inventory: [
			{
				size: String,
				quantity: Number,
			},
		],
	},
	{
		timestamps: true,
	}
);

productSchema.plugin(mongooseSlugPlugin, { tmpl: '<%=name%>', historyField: false });

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
