require('dotenv').config({ path: `${__dirname}/../.env` });
const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
const cors = require('cors');

connectDB();
const app = express();

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.send('API RUNNING');
});

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`.magenta.bold);
});
