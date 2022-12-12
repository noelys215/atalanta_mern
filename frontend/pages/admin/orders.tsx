import {
	Alert,
	Button,
	CircularProgress,
	Divider,
	Grid,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
//Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { getAdminOrderHistory } from '../../store/actions/getAdminOrderHistory';

function AdminOrdersScreen() {
	const router = useRouter();
	const dispatch = useDispatch<AppDispatch>();
	const { loading, error, orders }: any = useSelector((state: RootState) => state.orderHistory);
	const { userInfo } = useSelector((state: RootState) => state.userInfo);
	console.log(orders);
	useEffect(() => {
		if (!userInfo) router.push('/register');
		dispatch(getAdminOrderHistory({}));
	}, [router, userInfo]);

	return (
		<Box
			mb={'auto'}
			maxWidth="lg"
			sx={{
				p: 2,
				minHeight: '62.5rem',
				width: '100%',
				m: 'auto',
				mt: 10,
				backgroundColor: '#fffcf7',
				display: 'flex',
				flexDirection: 'column',
			}}>
			<Head>
				<title>Order History - Atalanta A.C.</title>
			</Head>
			<Grid item md={12} sm={12} xs={12}>
				<Box sx={{ width: { md: '80%', sm: '100%' }, m: 'auto' }}>
					<Typography variant="h6" sx={{ mt: 4 }}>
						Order History
					</Typography>
					<Divider sx={{ mb: 4, justifySelf: 'center' }} />
				</Box>
				{loading ? (
					<CircularProgress sx={{ display: 'flex', justifyContent: 'center' }} />
				) : error ? (
					<Alert sx={{ width: { md: '20%', sm: '90%' }, m: 'auto', fontSize: '1.3rem' }}>
						No orders 😔
					</Alert>
				) : (
					<TableContainer>
						<Table
							sx={{
								width: { md: '80%', sm: '100%' },
								whiteSpace: 'nowrap',
								m: 'auto',
							}}>
							<TableHead>
								<TableRow>
									<TableCell>ID</TableCell>
									<TableCell>NAME</TableCell>
									<TableCell>DATE</TableCell>
									<TableCell>TOTAL</TableCell>
									<TableCell>DATE PAID</TableCell>
									<TableCell>SHIPPED</TableCell>
									<TableCell>DELIVERED</TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{orders.map((order: any) => (
									<TableRow key={order._id}>
										<TableCell>{order._id}</TableCell>
										<TableCell>
											{order.user.lastName} {order.user.firstName}
										</TableCell>
										<TableCell>{order.createdAt.split('T')[0]}</TableCell>
										<TableCell>$ {order.totalPrice}</TableCell>
										<TableCell>
											{order.isPaid
												? `${order.paidAt.split('T')[0]}`
												: 'Not Paid'}
										</TableCell>
										<TableCell>
											{order.isShipped
												? `${order.shippedAt.split('T')[0]}`
												: 'Not Shipped'}
										</TableCell>
										<TableCell>
											{order.isDelivered
												? `${order.deliveredAt.split('T')[0]}`
												: 'Not Delivered'}
										</TableCell>
										<TableCell>
											<Link href={`/admin/order/${order._id}`} passHref>
												<Button variant="contained">Details</Button>
											</Link>
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</TableContainer>
				)}
			</Grid>
		</Box>
	);
}

export default dynamic(() => Promise.resolve(AdminOrdersScreen), {
	ssr: false,
});
