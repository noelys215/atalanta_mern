import { Box, Divider, Typography } from '@mui/material';
import axios from 'axios';
import React from 'react';
import Layout from '../../../components/Layout';
import ProductsCat from '../../../components/ProductsCat';

interface ProductProps {
	tanks?: string[];
	shirts?: string[];
	jackets?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const manTops: React.FC<ProductProps> = ({ tanks, shirts, jackets }) => {
	return (
		<>
			<Layout title={`MAN | TOPS`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						{`MAN | TOPS`}
					</Typography>
				</Box>

				<Divider />

				<ProductsCat title="TANKS" products={tanks} cat={'tops'} />
				<ProductsCat title="SHIRTS" products={shirts} cat={'tops'} />
				<ProductsCat title="JACKETS / OUTERWEAR" products={jackets} cat={'tops'} />
			</Layout>
		</>
	);
};

export default manTops;

export async function getStaticProps() {
	const { data } = await axios.get(`${process.env.API_URL}/products`);

	const tanks = data.filter(
		(prod: any) => prod.category === 'tanks' && prod.department === 'man'
	);
	const shirts = data.filter(
		(prod: any) => prod.category === 'shirts' && prod.department === 'man'
	);
	const jackets = data.filter(
		(prod: any) => prod.category === 'jackets' && prod.department === 'man'
	);

	return {
		props: {
			tanks,
			shirts,
			jackets,
		},
		revalidate: 15,
	};
}
