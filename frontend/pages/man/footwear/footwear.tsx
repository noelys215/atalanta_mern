import { Box, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';

interface ProductProps {
	footwear?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	cat?: string;
}

const manShoes: React.FC<ProductProps> = ({ footwear }) => {
	return (
		<>
			<Layout title={`MAN | FOOTWEAR`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						{`MAN | FOOTWEAR`}
					</Typography>
				</Box>
				<Divider />

				<ProductsCat title="FOOTWEAR" products={footwear} cat={'footwear'} />
			</Layout>
		</>
	);
};

export default manShoes;

export async function getStaticProps() {
	const { data } = await axios.get(`${process.env.API_URL}/products`);

	const footwear = data.filter(
		(prod: any) => prod.category === 'footwear' && prod.department === 'man'
	);

	return {
		props: {
			footwear,
		},
		revalidate: 15,
	};
}
