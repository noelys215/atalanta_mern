import axios from 'axios';
import nc from 'next-connect';
import config from '../../../utils/config';
import { signToken, isAuth } from '../../../utils/auth';

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
						id: req.user._id,
						set: {
							firstName: req.body.firstName,
							lastName: req.body.lastName,
							email: req.body.email,
							telephone: req.body.phone,
							country: req.body.country,
							address: req.body.address,
							addressCont: req.body.addressCont,
							state: req.body.state,
							city: req.body.city,
							postalCode: req.body.postalCode,
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

	const user = {
		_id: req.user._id,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		telephone: req.body.phone,
		country: req.body.country,
		address: req.body.address,
		addressCont: req.body.addressCont,
		state: req.body.state,
		city: req.body.city,
		postalCode: req.body.postalCode,
		isAdmin: req.user.isAdmin,
	};
	const token = signToken(user);
	res.send({ ...user, token });
});

export default handler;
