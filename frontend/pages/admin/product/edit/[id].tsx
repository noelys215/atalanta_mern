import { Button, CircularProgress, Divider, Grid, TextField, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Box } from '@mui/system';
import { Controller, useForm, useFieldArray } from 'react-hook-form';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { AppDispatch, RootState } from '../../../../store/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Head from 'next/head';
import { reset } from '../../../../store/slices/productsSlice';
import { updateProduct } from '../../../../store/actions/updateProduct';
import { getProductDetails } from '../../../../store/actions/getProductDetails';
import axios from 'axios';
import Image from 'next/image';

export default function ProductEditScreen() {
	const { products, createSuccess, deleteSuccess, product }: any = useSelector(
		(state: RootState) => state.products
	);
	const [edit, setEdit] = React.useState(true);
	const [uploading, setUploading] = React.useState(false);
	const [images, setImages] = React.useState([]);
	const [imageSrc, setImageSrc] = React.useState(product?.image);
	const router = useRouter();
	const { id } = router.query;

	// Toolkit
	const dispatch = useDispatch<AppDispatch>();

	// Submit Handler
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
		setValue,
	} = useForm({
		defaultValues: {
			inventory: [{ size: '', quantity: 0 }],
			name: product?.name,
			price: product?.price,
			category: product?.category,
			department: product?.department,
			brand: product?.brand,
			color: product?.color,
			description: product?.description,
			image: product?.image,
			size: product?.inventory?.size,
			quantity: product?.inventory?.quantity,
		},
	});
	//
	const { fields, append, prepend, remove } = useFieldArray({
		name: 'inventory',
		control,
	});

	// Prefills User Info onto Form
	React.useEffect(() => {
		if (createSuccess) {
			dispatch(reset());
			router.push('/admin/product-list');
		} else {
			if (!product?.name || product?._id !== id) {
				dispatch(getProductDetails(id));
			}
			setValue('name', product?.name || '');
			setValue('brand', product?.brand);
			setValue('price', product?.price);
			setValue('category', product?.category);
			setValue('department', product?.department);
			setValue('brand', product?.brand);
			setValue('image', product?.image || images);
			setValue('color', product?.color);
			setValue('description', product?.description);
			setValue('size', product?.inventory?.size);
			setValue('quantity', product?.inventory?.quantity);
		}
	}, [createSuccess, router, product, products, setValue, dispatch, product.inventory]);

	const submitHandler = async (
		{
			_id,
			name,
			price,
			category,
			department,
			brand,
			color,
			description,
			inventory,
			image,
		}: any,
		e: any
	) => {
		e.preventDefault();

		try {
			dispatch(
				updateProduct({
					_id: id,
					name,
					price,
					category,
					department,
					brand,
					color,
					description,
					inventory,
					image,
				})
			);
			toast('Product Updated');
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	const uploadFileHandler = async (e: any) => {
		const formData = new FormData();

		const files = Array.from(e.target.files);
		files.forEach((file: any) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			formData.append('image', file);
			reader.onloadend = () => {
				// @ts-expect-error
				setImages((oldArray) => [...oldArray, reader.result]);
			};
			setUploading(true);
		});

		try {
			const config = {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			};

			const { data } = await axios.post(`${process.env.API_URL}/upload`, formData, config);
			setValue('image', data);

			// setValue('image', images);
			setImages(data);
			setImageSrc(data);

			setUploading(false);
		} catch (error) {
			console.error(error);
			setUploading(false);
		}
	};

	return (
		<>
			<Head>
				<title>{product?.name} - Atalanta A.C.</title>
			</Head>

			<Box
				mb={'auto'}
				maxWidth="lg"
				sx={{
					// minHeight: '62.5rem',
					mt: 10,
					ml: 'auto',
					mr: 'auto',
					backgroundColor: '#fffcf7',
					display: 'flex',
					flexDirection: 'column',
				}}>
				<Grid
					item
					md={12}
					sm={12}
					xs={12}
					sx={{ width: { md: '70%', sm: '90%' } }}
					m={'auto'}>
					<form onSubmit={handleSubmit(submitHandler)}>
						<Box display={'flex'} justifyContent="space-between">
							<Typography sx={{ mt: 4 }}>Create Product</Typography>{' '}
							<Button onClick={() => setEdit(!edit)}>
								<Typography sx={{ mt: 3 }}>Edit</Typography>
							</Button>
						</Box>
						<Divider sx={{ mb: 4, justifySelf: 'center' }} />

						{/* Product Name */}
						<Controller
							defaultValue=""
							name="name"
							control={control}
							rules={{
								required: true,
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{ mb: 2.5 }}
									className="register"
									id="name"
									label="Name"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.name)}
									helperText={
										errors.name
											? errors.name.type === 'minLength'
												? 'Invalid Name'
												: 'First Name Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Product Price */}
						<Controller
							name="price"
							defaultValue=""
							control={control}
							rules={{
								required: true,
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									className="register"
									id="price"
									sx={{ mb: 2.5 }}
									label="Price"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.price)}
									helperText={
										errors.price
											? errors.price.type === 'minLength'
												? 'Invalid Price'
												: 'Price Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Category */}
						<Controller
							name="category"
							defaultValue=""
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{
										mb: 2.5,
										'& .MuiInput-input': {
											width: 500,
										},
										'& 	.Mui-focused': {
											width: '500 !important',
										},
										'& 	.MuiInput-root': {
											width: 500,
										},
									}}
									className="register"
									id="category"
									label="Category"
									inputProps={{ type: 'category' }}
									error={Boolean(errors.category)}
									helperText={
										errors.category
											? errors.category.type === 'pattern'
												? 'Invalid Category'
												: 'Category Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Department */}
						<Controller
							name="department"
							defaultValue=""
							control={control}
							rules={{ required: true }}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{
										mb: 2.5,
										'& .MuiInput-input': {
											width: 500,
										},
										'& 	.Mui-focused': {
											width: '500 !important',
										},
										'& 	.MuiInput-root': {
											width: 500,
										},
									}}
									className="register"
									id="department"
									label="department"
									inputProps={{ type: 'department' }}
									error={Boolean(errors.department)}
									helperText={
										errors.department
											? errors.department.type === 'pattern'
												? 'Invalid Department'
												: 'Department Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Color */}
						<Controller
							name="color"
							defaultValue=""
							control={control}
							rules={{
								required: true,
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{ mb: 2.5 }}
									className="register"
									id="color"
									label="Color"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.color)}
									helperText={
										errors.color
											? errors.color.type === 'minLength'
												? 'Invalid Color'
												: 'Color Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Brand */}
						<Controller
							name="brand"
							defaultValue=""
							control={control}
							rules={{
								required: true,
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{ mb: 2.5 }}
									className="register"
									id="brand"
									label="Brand"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.brand)}
									helperText={
										errors.brand
											? errors.brand.type === 'minLength'
												? 'Invalid Brand'
												: 'Brand Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Description */}
						<Controller
							name="description"
							defaultValue=""
							control={control}
							rules={{
								required: true,
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									multiline
									minRows={4}
									disabled={!edit}
									sx={{ mb: 2.5 }}
									className="register"
									id="description"
									label="Description"
									inputProps={{ type: 'text' }}
									error={Boolean(errors.description)}
									helperText={
										errors.description
											? errors.description.type === 'minLength'
												? 'Invalid Description'
												: 'Description Required'
											: ''
									}
									{...field}
								/>
							)}
						/>
						{/* Image
						<Controller
							name="image"
							defaultValue=""
							control={control}
							rules={{
								required: false,
								minLength: 1,
							}}
							render={({ field }) => (
								<TextField
									disabled={!edit}
									sx={{ mb: 2.5 }}
									className="register"
									id="image"
									label="Image"
									type="file"
									inputProps={{ type: 'array', multiple: true }}
									error={Boolean(errors.image)}
									helperText={
										errors.image
											? errors.image.type === 'minLength'
												? 'Invalid Image'
												: 'Image Required'
											: ''
									}
									{...field}
								/>
							)}
						/> */}

						<Box m={1}>
							{!imageSrc ? (
								<Box sx={{ mb: 2.5 }}>
									<Typography>No Images Uploaded</Typography>
								</Box>
							) : (
								imageSrc.map((x: string) => (
									<Image src={x} alt="x" width={120} height={120} />
								))
							)}
						</Box>

						{/* Image Upload*/}
						<Controller
							name="image"
							defaultValue=""
							control={control}
							rules={{
								required: false,
								minLength: 1,
							}}
							render={({ field }) => (
								<>
									<TextField
										onChange={uploadFileHandler}
										sx={{ mb: 2.5 }}
										className="register"
										id="image"
										disabled={!edit}
										name="image"
										type="file"
										inputProps={{
											multiple: true,
										}}
									/>
									{uploading && <CircularProgress />}
								</>
							)}
						/>

						{fields.map((field, index) => (
							<Box
								display={'flex'}
								flexDirection={'column'}
								width={'100%'}
								gap={2.5}
								key={field.id}>
								<Box
									className="register"
									display={'flex'}
									// width={'50%'}
									gap={2.5}
									key={index}>
									{/* Size */}
									<Controller
										name="size"
										defaultValue={''}
										control={control}
										render={({ field }) => (
											<TextField
												disabled={!edit}
												sx={{ mb: 2.5 }}
												className="register"
												id={'size'}
												label="Size"
												inputProps={{ type: 'text' }}
												error={Boolean(errors.size)}
												helperText={errors.size ? 'Size Required' : ''}
												{...register(`inventory.${index}.size`)}
											/>
										)}
									/>
									{/* Quantity */}
									<Controller
										name="quantity"
										defaultValue={''}
										control={control}
										render={({ field }) => (
											<TextField
												disabled={!edit}
												sx={{ mb: 2.5 }}
												className="register"
												id={'quantity'}
												label="Quantity"
												inputProps={{ type: 'text' }}
												error={Boolean(errors.size)}
												helperText={errors.size ? 'Quantity Required' : ''}
												{...register(`inventory.${index}.quantity`)}
											/>
										)}
									/>

									<Button
										onClick={(e) => {
											append({ size: '', quantity: 0 });
										}}>
										<AddIcon />
									</Button>
									<Button
										sx={{ m: 'auto' }}
										onClick={() => {
											remove(index);
										}}>
										<RemoveIcon />
									</Button>
								</Box>
								{/* Plus */}
							</Box>
						))}
						<Button
							disabled={!edit}
							fullWidth
							type="submit"
							variant="contained"
							sx={{ backgroundColor: 'rgb(68, 68, 68)', mb: 2 }}>
							Update
						</Button>
					</form>
				</Grid>
			</Box>
		</>
	);
}
