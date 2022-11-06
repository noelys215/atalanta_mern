import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from '../../../../utils/auth';
import config from '../../../../utils/config';

const handler = nc();

handler.use(isAuth);
handler.put(async (req, res) => {
	const tokenWithWriteAccess = process.env.SANITY_AUTH_TOKEN;
	await axios.post(
		`https://${config.projectId}.api.sanity.io/v1/data/mutate/${config.dataset}`,
		{
			mutations: [
				{
					patch: {
						id: req.query.id,
						set: {
							isPaid: true,
							paidAt: new Date().toISOString().split('T')[0],
							'paymentResult.id': req.body.id,
							'paymentResult.status': req.body.status,
							'paymentResult.email_address': req.body.email,
						},
					},
				},
			],
		},
		{
			headers: {
				'Content-type': 'application/json',
				Authorization: `Bearer ${tokenWithWriteAccess}`,
			},
		}
	);

	res.send({ message: 'order paid' });
});

export default handler;
