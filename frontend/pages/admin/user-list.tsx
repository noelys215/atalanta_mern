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
import CheckTwoToneIcon from '@mui/icons-material/CheckTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
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
import { getUserList } from '../../store/actions/getUserList';
import { deleteUser } from '../../store/actions/deleteUser';

function UserListScreen() {
	const router = useRouter();
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch<AppDispatch>();
	const { userInfo, users, success }: any = useSelector((state: RootState) => state.userInfo);

	/* 
	KNOWN BUG:
	state is null upon user deletion, need to refresh page to retrieve state;
	temp fixed via router.reload(); not optimal
	*/

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getUserList());
		} else {
			router.push('/');
		}

		setLoading(false);
	}, [dispatch, router, success, userInfo, loading]);

	const deleteHandler = (user: string) => {
		dispatch(deleteUser(user)).then(() => router.reload());
	};

	return (
		<>
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
					<title> User List - Atalanta A.C.</title>
				</Head>
				<Grid item md={12} sm={12} xs={12}>
					<Box sx={{ width: { md: '80%', sm: '100%' }, m: 'auto' }}>
						<Typography variant="h6" sx={{ mt: 4 }}>
							User List
						</Typography>
						<Divider sx={{ mb: 4, justifySelf: 'center' }} />
					</Box>
					{/* {loading && (
						<CircularProgress sx={{ display: 'flex', justifyContent: 'center' }} />
					)} */}

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
									<TableCell>EMAIL</TableCell>
									<TableCell>ADMIN</TableCell>
									<TableCell></TableCell>
									<TableCell></TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{users.length > 0 &&
									users.map((user: any) => (
										<TableRow key={user._id}>
											<TableCell>{user._id}</TableCell>
											<TableCell>
												{user.lastName} {user.firstName}
											</TableCell>
											<TableCell>
												<Link href={`mailto:${user.email}`}>
													{user.email}
												</Link>
											</TableCell>
											<TableCell>
												<strong>
													{user.isAdmin ? (
														<CheckTwoToneIcon />
													) : (
														<CloseTwoToneIcon />
													)}
												</strong>
											</TableCell>
											<TableCell>
												<Link href={`/admin/user/edit/${user._id}`}>
													<Button variant="contained">
														<EditIcon />
													</Button>
												</Link>
											</TableCell>
											<TableCell>
												<Button
													variant="contained"
													onClick={() => deleteHandler(user._id)}>
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

export default dynamic(() => Promise.resolve(UserListScreen), {
	ssr: false,
});
