import { Box, Button, Divider, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import ProductsCat from '../../../components/ProductsCat';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Layout from '../../../components/Layout';
import axios from 'axios';

interface ProductProps {
	footwear?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
	cat?: string;
}

const womanShoes: React.FC<ProductProps> = ({ footwear }) => {
	const router = useRouter();

	return (
		<>
			<Layout title={`WOMAN | FOOTWEAR`}>
				{/* Title */}

				<Box display={'flex'} justifyContent={'space-between'}>
					<Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
						<Button onClick={() => router.back()}>
							<ArrowBackIcon sx={{ p: 0 }} />
						</Button>
						<Typography variant="h5">{`WOMAN | FOOTWEAR`}</Typography>
					</Box>
				</Box>

				<Divider />

				{/* Test */}
				<ProductsCat title="FOOTWEAR" products={footwear} cat={'footwear'} />
			</Layout>
		</>
	);
};

export default womanShoes;

export async function getStaticProps() {
	const { data } = await axios.get(`http://127.0.0.1:5000/api/products`);

	const footwear = data.filter(
		(prod: any) => prod.category === 'footwear' && prod.department === 'woman'
	);

	return {
		props: {
			footwear,
		},
		revalidate: 15,
	};
}
