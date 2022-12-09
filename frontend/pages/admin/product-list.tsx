import {
	Button,
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
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverTwoToneIcon from '@mui/icons-material/DeleteForeverTwoTone';
import { Box } from '@mui/system';
import dynamic from 'next/dynamic';
import Head from 'next/head';
// import Link from 'next/link';
import Link from '../../src/Link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
//Redux Toolkit
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../../store/store';
import { fetchProducts, reset } from '../../store/slices/productsSlice';
import { deleteProduct } from '../../store/actions/deleteProduct';
import { createProduct } from '../../store/actions/createProduct';

function ProductListScreen() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { userInfo, success }: any = useSelector((state: RootState) => state.userInfo);
	const {
		products,
		createSuccess,
		deleteSuccess,
		product: createdProduct,
	}: any = useSelector((state: RootState) => state.products);

	useEffect(() => {
		dispatch(reset());
		if (!userInfo.isAdmin) {
			router.push('/');
		}

		if (createSuccess) {
			router.push(`/admin/product/edit/${createdProduct._id}`);
		} else {
			dispatch(fetchProducts());
		}

		setLoading(false);
	}, [dispatch, router, success, createSuccess, userInfo, deleteSuccess, loading]);

	//*TODO: USE MATERIAL UI DIALOG INSTEAD OF DEFAULT CONFIRM WINDOW
	const deleteHandler = (prod: string) => {
		if (confirm(`Are you sure you want to delete?`) == false) {
			console.log('Not Deleted');
		} else {
			console.log('Deleted');
			dispatch(deleteProduct(prod));
		}
	};

	const createProductHandler = (product: any) => {
		dispatch(createProduct(product));
	};

	return (
		<>
			<Box
				mb={'auto'}
				maxWidth="lg"
				sx={{
					// p: 1,
					// minHeight: '62.5rem',
					width: '100%',
					m: 'auto',
					mt: 10,
					backgroundColor: '#fffcf7',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Head>
					<title> Product List - Atalanta A.C.</title>
				</Head>
				<Grid item md={12} sm={12} xs={12}>
					<Box
						sx={{
							width: { md: '80%', sm: '100%' },
							m: 'auto',
							mt: 4,
							display: 'flex',
							justifyContent: 'space-between',
						}}>
						<Typography variant="h6" sx={{}}>
							Product List
						</Typography>
						<Button variant="contained" onClick={createProductHandler}>
							+ Create Product
						</Button>
					</Box>
					<Divider sx={{ m: 'auto', mt: 1, width: '90%' }} />

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
									<TableCell>PRICE</TableCell>
									<TableCell>DEPARTMENT</TableCell>
									<TableCell>CATEGORY</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{products.length > 0 &&
									products.map((product: any) => (
										<TableRow key={product._id}>
											<TableCell>{product._id}</TableCell>
											<TableCell>{product.name}</TableCell>
											<TableCell>${product.price.toFixed(2)}</TableCell>
											<TableCell>
												{product.department.toUpperCase()}
											</TableCell>
											<TableCell>{product.category.toUpperCase()}</TableCell>
											<TableCell>
												<Link href={`/admin/product/edit/${product._id}`}>
													<Button variant="contained">
														<EditIcon />
													</Button>
												</Link>
											</TableCell>
											<TableCell>
												<Button
													variant="contained"
													onClick={() => deleteHandler(product._id)}>
													<DeleteForeverTwoToneIcon />
												</Button>
											</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
			</Box>
		</>
	);
}

export default dynamic(() => Promise.resolve(ProductListScreen), {
	ssr: false,
});
