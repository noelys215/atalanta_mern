const bcrypt = require('bcryptjs');

const users = [
	{
		firstName: 'Admin',
		lastName: 'User',
		email: 'admin@example.com',
		password: bcrypt.hashSync('123456', 10),
		isAdmin: true,
		telephone: '555-555-5555',
		country: 'United States',
		address: '123 Main Street',
		addressCont: 'Apt 1',
		state: 'New Jersey',
		city: 'Camden',
		postalCode: 08110,
	},
	{
		firstName: 'Asuka',
		lastName: 'Langley',
		email: 'admin2@example.com',
		password: bcrypt.hashSync('123456', 10),
		telephone: '555-555-5555',
		country: 'United States',
		address: '123 Main Street',
		addressCont: 'Apt 2',
		state: 'New Jersey',
		city: 'Camden',
		postalCode: 08110,
	},
	{
		firstName: 'Rei',
		lastName: 'Ayanami',
		email: 'admin0@example.com',
		password: bcrypt.hashSync('123456', 10),
		telephone: '555-555-5555',
		country: 'United States',
		address: '123 Main Street',
		addressCont: 'Apt 0',
		state: 'New Jersey',
		city: 'Camden',
		postalCode: 08110,
	},
];

module.exports = users;
