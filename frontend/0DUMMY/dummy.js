// const dummy = () => {
// 	return (
// 		<div>
// 			{fields.map((field, index) => (
// 				<Box
// 					display={'flex'}
// 					flexDirection={'column'}
// 					width={'100%'}
// 					gap={2.5}
// 					key={field.id}>
// 					{!product.inventory ? (
// 						<CircularProgress />
// 					) : (
// 						product.inventory.map(({ size, quantity }: any, index: any) => (
// 							<Box
// 								className="register"
// 								display={'flex'}
// 								// width={'50%'}
// 								gap={2.5}
// 								key={index}>

// 								<Controller
// 									name="size"
// 									defaultValue={size}
// 									control={control}
// 									render={({ field }) => (
// 										<TextField
// 											value={size}
// 											disabled={!edit}
// 											sx={{ mb: 2.5 }}
// 											className="register"
// 											id={'size'}
// 											label="Size"
// 											inputProps={{ type: 'text' }}
// 											error={Boolean(errors.size)}
// 											helperText={errors.size ? 'Size Required' : ''}
// 											{...register(`inventory.${index}.size`)}
// 										/>
// 									)}
// 								/>

// 								<Controller
// 									name="quantity"
// 									defaultValue={quantity}
// 									control={control}
// 									render={({ field }) => (
// 										<TextField
// 											value={quantity}
// 											disabled={!edit}
// 											sx={{ mb: 2.5 }}
// 											className="register"
// 											id={'quantity'}
// 											label="Quantity"
// 											inputProps={{ type: 'text' }}
// 											error={Boolean(errors.size)}
// 											helperText={errors.size ? 'Quantity Required' : ''}
// 											{...register(`inventory.${index}.quantity`)}
// 										/>
// 									)}
// 								/>

// 								<Button
// 									onClick={(e) => {
// 										append({ size: '', quantity: 0 });
// 									}}>
// 									<AddIcon />
// 								</Button>
// 								<Button
// 									sx={{ m: 'auto' }}
// 									onClick={() => {
// 										console.log(index);
// 										remove(index);
// 									}}>
// 									<RemoveIcon />
// 								</Button>
// 							</Box>
// 						))
// 					)}
// 				</Box>
// 			))}

// 			{!product.inventory ? (
// 				<CircularProgress />
// 			) : (
// 				product.inventory.map(({ size, quantity }: any, i: any) => (
// 					<Box display={'flex'} flexDirection={'column'} width={'100%'} gap={2.5} key={i}>
// 						{fields.map((field, index) => (
// 							<Box
// 								display={'flex'}
// 								// flexDirection={'column'}
// 								width={'100%'}
// 								gap={2.5}
// 								key={field.id}>
// 								<Controller
// 									name="size"
// 									defaultValue={size}
// 									control={control}
// 									render={({ field }) => (
// 										<TextField
// 											value={size}
// 											disabled={!edit}
// 											sx={{ mb: 2.5 }}
// 											className="register"
// 											id={'size'}
// 											label="Size"
// 											inputProps={{ type: 'text' }}
// 											error={Boolean(errors.size)}
// 											helperText={errors.size ? 'Size Required' : ''}
// 											{...register(`inventory.${index}.size`)}
// 										/>
// 									)}
// 								/>
// 								<Controller
// 									name="quantity"
// 									defaultValue={quantity}
// 									control={control}
// 									render={({ field }) => (
// 										<TextField
// 											value={quantity}
// 											disabled={!edit}
// 											sx={{ mb: 2.5 }}
// 											className="register"
// 											id={'quantity'}
// 											label="Quantity"
// 											inputProps={{ type: 'text' }}
// 											error={Boolean(errors.size)}
// 											helperText={errors.size ? 'Quantity Required' : ''}
// 											{...register(`inventory.${index}.quantity`)}
// 										/>
// 									)}
// 								/>
// 								<Button
// 									onClick={(e) => {
// 										console.log(field.id);
// 										append({ size: '', quantity: 0 });
// 									}}>
// 									<AddIcon />
// 								</Button>
// 								<Button
// 									sx={{ m: 'auto' }}
// 									onClick={() => {
// 										console.log(field.id);
// 										remove(index);
// 									}}>
// 									<RemoveIcon />
// 								</Button>
// 							</Box>
// 						))}
// 					</Box>
// 				))
// 			)}
// 		</div>
// 	);
// }
