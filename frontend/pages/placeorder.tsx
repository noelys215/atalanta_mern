import { Button, CircularProgress, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import CheckoutWizard from '../components/CheckoutWizard';
import { getError } from '../utils/error';
//Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store/store';
import { createOrder } from '../store/actions/createOrder';
import { cartClear } from '../store/slices/cartSlice';
import Cookies from 'js-cookie';

const PlaceOrderScreen = () => {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	//
	const dispatch = useDispatch<AppDispatch>();
	const { order }: any = useSelector((state: RootState) => state.order);
	const { userInfo }: any = useSelector((state: RootState) => state.userInfo);
	console.log(userInfo);

	const { cartItems, shippingAddress } = useSelector((state: RootState) => state.payment.cart);
	console.log(order);

	const paymentMethod = Cookies.get('paymentMethod');

	// Cart Totals
	const itemsPrice = +cartItems
		.reduce((a: any, c: any) => a + c.quantity * c.price, 0)
		.toFixed(2);

	const shippingPrice = +(itemsPrice > 200 ? 0 : 15).toFixed(2);
	const taxPrice = +(itemsPrice * 0.15).toFixed(2);
	const totalPrice = +(itemsPrice + shippingPrice + taxPrice).toFixed(2);

	useEffect(() => {
		if (cartItems.length === 0) {
			setLoading(true);
			router.reload();
		}
		if (!paymentMethod) {
			router.push('/payment');
		}
		// if (cartItems.length === 0) {
		// 	router.push('/cart');
		// }
	}, [cartItems, paymentMethod, router]);

	const placeOrderHandler = async () => {
		try {
			// setLoading(true);
			// setLoading(true);
			await dispatch(
				createOrder({
					orderItems: cartItems,
					shippingAddress,
					paymentMethod,
					itemsPrice,
					shippingPrice,
					taxPrice,
					totalPrice,
					user: userInfo,
				})
			)
				.then((res) => router.push(`/order/${res.payload._id}`))
				.then(() => console.log(order))
				.then(() => setLoading(false));
		} catch (error) {
			setLoading(false);
			toast(getError(error));
		}
	};

	return (
		<>
			{loading && <CircularProgress />}
			<Box
				maxWidth="lg"
				sx={{
					p: 2,
					m: 'auto',
					mt: 10,
					ml: 'auto',
					mr: 'auto',
					backgroundColor: '#fffcf7',
					display: 'flex',
					flexDirection: 'column',
					width: '100%',
				}}>
				<Head>
					<title>Place Order - Atalanta A.C.</title>
				</Head>
				<Box mt={10}>
					<CheckoutWizard activeStep={3} />
				</Box>

				{/* Shipping Address */}
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '90%', xs: '100%' } }}
					m={'auto'}>
					<Typography sx={{ mt: 4 }}>Place Order</Typography>
					<Divider sx={{ mb: 1, justifySelf: 'center' }} />
					<List>
						<ListItem>
							<Typography>Shipping Address:</Typography>
						</ListItem>
						<ListItem sx={{ whiteSpace: 'pre-line' }}>
							{`${shippingAddress.firstName} ${shippingAddress.lastName}
						${shippingAddress.address} 
						${shippingAddress.city} ${shippingAddress.state}
						${shippingAddress.postalCode} 
						${shippingAddress.country}
					`}
						</ListItem>
						<ListItem>
							<Button
								fullWidth
								type="submit"
								onClick={() => router.push('/shipping')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Edit
							</Button>
						</ListItem>
					</List>
				</Grid>

				{/* Payment Method */}
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '90%', xs: '100%' } }}
					m={'auto'}>
					<Divider sx={{ mb: 1, justifySelf: 'center' }} />
					<List>
						<ListItem>
							<Typography>Payment Method:</Typography>
						</ListItem>
						<ListItem sx={{ whiteSpace: 'pre-line' }}>{paymentMethod}</ListItem>
						<ListItem>
							<Button
								fullWidth
								type="submit"
								onClick={() => router.push('/payment')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Edit
							</Button>
						</ListItem>
					</List>
				</Grid>

				{/* Ordered Items */}
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '90%', xs: '100%' } }}
					m={'auto'}>
					<Divider sx={{ mb: 1, justifySelf: 'center' }} />
					<List>
						<ListItem>
							<Typography>Ordered Items:</Typography>
						</ListItem>

						<Grid container>
							{cartItems.map((item: any) => (
								<Grid
									item
									md={4}
									sm={12}
									xs={12}
									key={item?._key}
									display={'flex'}
									sx={{ cursor: 'pointer' }}
									mb={2}>
									<Link href={item?.path} passHref>
										<Box>
											<Image
												src={item?.image}
												width={180}
												height={180}
												alt={item?.name}
											/>
										</Box>
									</Link>

									<Box ml={2.5} width={'60%'}>
										<Typography variant="body1" gutterBottom>
											<q>{item?.name}</q>
										</Typography>
										<Typography variant="body2">
											Size: {item?.selectedSize}
										</Typography>
										<Typography variant="body2">
											Quantity: {item?.quantity}
										</Typography>
										<Typography variant="body2">
											Price: {`$${item?.price.toFixed(2)}`}
										</Typography>
										<Typography variant="body2">Color: Black</Typography>
									</Box>
								</Grid>
							))}
						</Grid>

						<ListItem>
							<Button
								fullWidth
								type="submit"
								onClick={() => router.push('/cart')}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Edit
							</Button>
						</ListItem>
						{/* Place Order */}
						<ListItem>
							<Button
								fullWidth
								type="submit"
								disabled={loading}
								onClick={placeOrderHandler}
								variant="contained"
								sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
								Place Order
							</Button>
						</ListItem>
						{loading && (
							<ListItem>
								<CircularProgress />
							</ListItem>
						)}
					</List>
				</Grid>
			</Box>
		</>
	);
};

export default dynamic(() => Promise.resolve(PlaceOrderScreen), { ssr: false });
