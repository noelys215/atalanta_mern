const mongoose = require('mongoose');

const connectDB = async () => {
	try {
		const conn = await mongoose.connect(process.env.MONGODB_URI);
		console.log(`Connected to MongoDB: ${conn.connection.host}`.cyan.underline);
	} catch (error) {
		console.error(`Error connecting to MongoDB: ${error.message}`.red.underline.bold);
		process.exit(1);
	}
};

module.exports = connectDB;
