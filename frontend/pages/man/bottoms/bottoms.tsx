import React from 'react';
import { Box, Divider, Typography } from '@mui/material';
import ProductsCat from '../../../components/ProductsCat';
import Layout from '../../../components/Layout';
import axios from 'axios';
interface ProductProps {
	pants?: string[];
	shorts?: string[];
	loading?: boolean;
	error?: string;
	type?: string;
	sort?: any;
}

const manBottoms: React.FC<ProductProps> = ({ pants, shorts }) => {
	return (
		<>
			<Layout title={`MAN | BOTTOMS`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						{`MAN | BOTTOMS`}
					</Typography>
				</Box>

				<Divider />

				<ProductsCat title="SHORTS" products={shorts} cat={'bottoms'} />
				<ProductsCat title="PANTS" products={pants} cat={'bottoms'} />
			</Layout>
		</>
	);
};

export default manBottoms;

export async function getStaticProps() {
	const { data } = await axios.get(`${process.env.API_URL}/products`);

	const shorts = data.filter(
		(prod: any) => prod.category === 'shorts' && prod.department === 'man'
	);
	const pants = data.filter(
		(prod: any) => prod.category === 'pants' && prod.department === 'man'
	);

	return {
		props: {
			shorts,
			pants,
		},
		revalidate: 15,
	};
}
