require('dotenv').config({ path: `${__dirname}/../.env` });
const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');
const path = require('path');

const cloudinary = require('cloudinary');

cloudinary.config({
	cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_KEY,
	api_secret: process.env.CLOUDINARY_SECRET,
});

connectDB();
const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/frontend/build')));

	app.get('*', (req, res) => {
		res.sendFile(
			path.resolve(__dirname, '..', 'frontend', 'build', 'server', 'pages', 'index.html')
		);
	});
} else {
	app.get('/', (req, res) => {
		res.header('Access-Control-Allow-Origin', '*');
		res.send('API RUNNING');
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.magenta.bold);
});
