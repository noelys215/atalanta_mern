const products = [
	{
		name: 'DRI-FIT RACERBACK TANK',
		image: ['/images/dri-fit-racerback.webp'],
		description:
			'MOVE NATURALLY IN A DRY DESIGN.\n' +
			"Keep dry and moving comfortably in this training tank. Made with lightweight, sweat-wicking fabric in a racerback design, it'll have you covered from warmups through cool downs.\n" +
			'\n' +
			'Nike Dri-FIT technology moves sweat away from your skin for quicker evaporation, helping you stay dry and comfortable.\n' +
			'Odor-resistant finish helps the tank stay fresh.\n' +
			'\n' +
			'More Details\n' +
			'\n' +
			'Standard fit for a relaxed, easy feel\n' +
			'100% polyester\n' +
			'Machine wash\n' +
			'Imported',
		brand: 'Nike',
		category: 'tanks',
		price: 25,
		department: 'woman',
		color: 'black',
		inventory: [
			{ size: 'XS', quantity: 0 },
			{ size: 'SM', quantity: 1 },
			{ size: 'MD', quantity: 1 },
			{ size: 'LG', quantity: 1 },
		],
	},
	{
		name: 'ONE THERMA-FIT HALF ZIP LONG SLEEVE TOP',
		image: ['/images/THERMA-FIT.webp'],
		description:
			'Designed for all the ways you move, the Nike Therma-FIT One Top is made with soft fleece that helps keep you warm to, from and during your workout. \n' +
			'High-stretch fabric with sweat-wicking power flexes with every move while helping you stay dry.',
		brand: 'Nike',
		category: 'shirts',
		price: 60,
		department: 'woman',
		color: 'black',
		inventory: [
			{ quantity: 0, size: 'XS' },
			{ quantity: 5, size: 'SM' },
			{ quantity: 5, size: 'MD' },
			{ quantity: 8, size: 'LG' },
		],
	},
	{
		name: 'THERMA-FIT COZY FLEECE MOCK NECK TOP',
		image: ['/images/pinksweater.webp'],
		description:
			'COVER UP AND BE COZY.\n' +
			'Stay warm before and after your workout in the Nike Therma-FIT Cozy Fleece Mock Neck Top In Pink. Thick, fuzzy fleece fits easily over your outfit to keep you comfortable. Cinch it in at the bottom to keep out the cold.\n' +
			'\n' +
			'Cozy Comfort\n' +
			'Thick, fuzzy fleece feels soft and comfortable. It has an oversized fit that layers easily over your workout clothes.\n' +
			'\n' +
			'Lasting Warmth\n' +
			'Nike Therma-FIT technology helps manage your body’s natural heat to help keep you warm in cold-weather conditions.\n' +
			'\n' +
			'Secure Coverage\n' +
			'Adjust the hem to help keep you covered from the chill. Elastic cuffs hold the sleeves in place while you move.',
		brand: 'Nike',
		category: 'jackets',
		price: 65,
		department: 'woman',
		color: 'pink',
		inventory: [
			{ quantity: 5, size: 'XS' },
			{ quantity: 5, size: 'SM' },
			{ quantity: 5, size: 'MD' },
			{ quantity: 8, size: 'LG' },
		],
	},
];

module.exports = products;
