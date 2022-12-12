import axios from 'axios';
import ProductScreen from '../../../components/ProductScreen';

export default function SingleProduct({ product }: any) {
	return <ProductScreen product={product} />;
}

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps({ params }: any) {
	const { slug } = params;

	const { data } = await axios.get(`${process.env.API_URL}/products/`);
	const product = data.find((prod: any) => prod.slug === slug);

	return {
		props: {
			product,
		},
		// Next.js will attempt to re-generate the page:
		// - When a request comes in
		// - At most once every 10 seconds
		revalidate: 300,
	};
}

export async function getStaticPaths() {
	const { data } = await axios.get(`${process.env.API_URL}/products`);

	const res = data.filter(
		(prod: any) => prod.category === 'all' && prod.department === 'accessories'
	);

	const paths = res.map((prod: any) => ({
		params: { slug: prod.slug },
	}));
	return { paths, fallback: true };
}
