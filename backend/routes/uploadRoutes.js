const express = require('express');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const cloudinaryES6 = require('cloudinary');
const cloudinary = require('cloudinary').v2;

// const cloudinary = cloudinaryES6.v2;
const router = express.Router();

const storage = new CloudinaryStorage({
	cloudinary: cloudinary,
	params: {
		folder: 'Atalanta Uploads', // enter your preferred folder name
		format: async (req, file) => ['jpeg', 'png', 'jpg', 'webp'],
		allowed_formats: ['jpeg', 'png', 'jpg', 'webp'],
	},
});

const upload = multer({ storage });

router.post('/', upload.array('image'), (req, res) => {
	const uploadImageURL = req.files; // if use upload.array, use req.files instead
	const paths = uploadImageURL.map((x) => x.path);
	res.send(paths);
	// res.send(uploadImageURL);
	console.log(uploadImageURL);
});

module.exports = router;
