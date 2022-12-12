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

export const womanBottoms: React.FC<ProductProps> = ({ pants, shorts }) => {
	return (
		<>
			<Layout title={`WOMAN | BOTTOMS`}>
				<Box display={'flex'} justifyContent={'space-between'}>
					<Typography variant="h5" mb={1}>
						{`WOMAN | BOTTOMS`}
					</Typography>
				</Box>

				<Divider />

				<ProductsCat department="woman" title="SHORTS" products={shorts} cat={'bottoms'} />
				<ProductsCat department="woman" title="PANTS" products={pants} cat={'bottoms'} />
			</Layout>
		</>
	);
};

export default womanBottoms;

export async function getStaticProps() {
	const { data } = await axios.get(`${process.env.API_URL}/products`);

	const shorts = data.filter(
		(prod: any) => prod.category === 'shorts' && prod.department === 'woman'
	);
	const pants = data.filter(
		(prod: any) => prod.category === 'pants' && prod.department === 'woman'
	);
	return {
		props: {
			shorts,
			pants,
		},
		revalidate: 15,
	};
}
