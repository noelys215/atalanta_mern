import { Button, CircularProgress, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { Box } from '@mui/system';
import axios from 'axios';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { getError } from '../../../utils/error';
import { PayPalButton } from 'react-paypal-button-v2';
import Layout from '../../../components/Layout';
//Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../../store/store';
import { getOrderDetails } from '../../../store/actions/getOrderDetails';
import { cartClear } from '../../../store/slices/cartSlice';
import { payOrder } from '../../../store/actions/payOrder';
import { payReset } from '../../../store/slices/orderPaySlice';
import { updateToShipped } from '../../../store/actions/updateToShipped';
import { shipReset } from '../../../store/slices/orderShipSlice';
import { reset } from '../../../store/slices/orderSlice';

const OrderDetails = ({ params }: any) => {
	const router = useRouter();
	// Toolkit
	const dispatch = useDispatch<AppDispatch>();
	const { userInfo } = useSelector((state: RootState) => state.userInfo);
	const { order, loading, error }: any = useSelector((state: RootState) => state.order);

	const {
		success: shipSuccess,
		loading: shipLoading,
		error: shipError,
	}: any = useSelector((state: RootState) => state.orderShip);

	const { id: orderId } = params;
	//
	useEffect(() => {
		if (loading || !order) {
			dispatch(getOrderDetails(orderId));
		}

		if (shipSuccess || !order || order._id !== orderId) {
			dispatch(payReset({}));
			dispatch(shipReset());
			dispatch(getOrderDetails(orderId));
		}
	}, [dispatch, orderId, order, shipSuccess]);

	const {
		shippingAddress,
		paymentMethod,
		orderItems,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice,
		isPaid,
		paidAt,
		isDelivered,
		isShipped,
		shippedAt,
		deliveredAt,
	} = order;

	const shipHandler = () => {
		dispatch(updateToShipped(order));
		toast(`Order: ${orderId} Shipped`);
	};

	return (
		<>
			{!order ? (
				<CircularProgress color="primary" variant="determinate" />
			) : !orderItems ? (
				<CircularProgress color="primary" variant="determinate" />
			) : (
				<Layout title={'Order'}>
					<Box display={'flex'}>
						<>
							<Grid
								container
								maxWidth="lg"
								sx={{
									p: 5,
									minHeight: 1000,
									mt: 10,
									ml: 'auto',
									mr: 'auto',
									backgroundColor: '#fffcf7',
								}}>
								{/* Shipping Address */}
								<Grid item md={12} sm={12} xs={12}>
									<Typography variant="h6" sx={{ mt: 4 }}>
										Order Summary: #{orderId.toUpperCase()}
									</Typography>
									<Divider sx={{ mb: 4, justifySelf: 'center' }} />
								</Grid>
								<Grid item md={6} sm={12} xs={12}>
									<Typography sx={{ mt: 4 }}>Shipping Address</Typography>
									<Divider sx={{ mb: 2, justifySelf: 'center' }} />
									<List>
										<ListItem>
											{shippingAddress?.firstName} {shippingAddress?.lastName}
										</ListItem>
										<ListItem>{shippingAddress?.address}</ListItem>
										<ListItem>
											{shippingAddress?.city} {shippingAddress?.state}{' '}
											{shippingAddress?.postalCode}{' '}
										</ListItem>
										<ListItem>{shippingAddress?.country}</ListItem>
										<ListItem>
											Status:{' '}
											{isDelivered
												? `Delivered at ${deliveredAt}`
												: 'Not delivered'}
										</ListItem>
									</List>
								</Grid>

								{/* Payment Method */}
								<Grid item md={6} sm={12} xs={12}>
									<Typography sx={{ mt: 4 }}>Payment Method</Typography>
									<Divider sx={{ mb: 2, justifySelf: 'center' }} />
									<List>
										<ListItem>Payment Method: {paymentMethod}</ListItem>
										<ListItem>
											Status: {isPaid ? `Paid on ${paidAt}` : 'not paid'}
										</ListItem>
										<ListItem>
											Status:{' '}
											{isShipped ? `Shipped on ${shippedAt}` : 'Not Shipped'}
										</ListItem>
									</List>
								</Grid>

								{/* Ordered Items */}
								<Grid item md={12} sm={12} xs={12}>
									<Typography sx={{ mt: 4 }}>Ordered Items</Typography>
									<Divider sx={{ mb: 2, justifySelf: 'center' }} />
								</Grid>

								{/* <ListItem> */}
								{orderItems.map((item: any) => (
									<Grid
										item
										md={4}
										sm={12}
										xs={12}
										key={item._id}
										display={'flex'}
										mb={2}>
										<Box>
											<Image
												src={item.image}
												width={180}
												height={180}
												alt={item.name}
											/>
										</Box>

										<Box ml={2.5} width={'60%'}>
											<Typography variant="body1" gutterBottom>
												<q>{item.name}</q>
											</Typography>
											<Typography variant="body2">
												Size: {item.size}
											</Typography>
											<Typography variant="body2">
												Quantity: {item.quantity}
											</Typography>
											<Typography variant="body2">
												Price: {`$${item.price.toFixed(2)}`}
											</Typography>
											<Typography variant="body2">Color: Black</Typography>
										</Box>
									</Grid>
								))}
								{/* </ListItem> */}

								{/* Order Summary */}
								<Grid item md={12} sm={12} xs={12}>
									<Typography sx={{ mt: 4 }}>Ordered Summary</Typography>
									<Divider sx={{ mb: 2, justifySelf: 'center' }} />

									<Grid
										container
										gap={3}
										justifyContent={'center'}
										height={'auto'}>
										<Grid item md={4} sm={12} xs={12}>
											<List>
												<ListItem>
													<Grid container>
														<Grid item xs={6}>
															<Typography>Items Price: </Typography>
														</Grid>
														<Grid item xs={6}>
															<Typography align="right">
																$ {itemsPrice}
															</Typography>
														</Grid>
													</Grid>
												</ListItem>
												<ListItem>
													<Grid container>
														<Grid item xs={6}>
															<Typography>Tax:</Typography>
														</Grid>
														<Grid item xs={6}>
															<Typography align="right">
																$ {taxPrice}
															</Typography>
														</Grid>
													</Grid>
												</ListItem>
												<ListItem>
													<Grid container>
														<Grid item xs={6}>
															<Typography>Shipping:</Typography>
														</Grid>
														<Grid item xs={6}>
															<Typography align="right">
																$ {shippingPrice}
															</Typography>
														</Grid>
													</Grid>
												</ListItem>
												<ListItem>
													<Grid container>
														<Grid item xs={6}>
															<Typography>
																<strong>Total:</strong>
															</Typography>
														</Grid>
														<Grid item xs={6}>
															<Typography align="right">
																<strong>$ {totalPrice}</strong>
															</Typography>
														</Grid>
													</Grid>
												</ListItem>
											</List>
										</Grid>

										{/* Admin Buttons */}
										{userInfo.isAdmin && order.isPaid && (
											<Grid
												item
												md={5}
												sm={12}
												xs={12}
												mt={'auto'}
												mb={'auto'}>
												{shipLoading && <CircularProgress />}
												<Box width={'auto'}>
													<Button
														disabled={order.isShipped}
														onClick={shipHandler}
														variant="contained"
														sx={{
															backgroundColor: 'rgb(68, 68, 68)',
															height: '50px',
															mr: 1,
														}}>
														Mark Shipped
													</Button>
													<Button
														disabled={true}
														// disabled={order.isDelivered}
														variant="contained"
														sx={{
															backgroundColor: 'rgb(68, 68, 68)',
															height: '50px',
														}}>
														Mark Delivered
													</Button>
												</Box>
											</Grid>
										)}
									</Grid>
								</Grid>
							</Grid>
						</>
					</Box>
				</Layout>
			)}
		</>
	);
};

export function getServerSideProps({ params }: any) {
	return { props: { params } };
}

export default dynamic(() => Promise.resolve(OrderDetails), { ssr: false });
