const express = require('express');
const Code = require('../models/code');
const router = express.Router();
const {
	handleValidateId,
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

const multer = require('multer');
const upload = multer();
const s3Files = require('../lib/s3Files');
const uuid = require('uuid');

// index
router.get('/', (req, res, next) => {
	console.log('hello wolrd');
	Code.find()
		.populate('author', 'email')
		.then((codes) => res.json(codes))
		.catch(next);
});

//show
router.get('/show/:id', (req, res, next) => {
	Code.findById(req.params.id)
		.populate('author', '_id')
		.then((code) => res.json(code))
		.catch(next);
});
//create
// router.post('/', requireToken, (req, res, next) => {
// 	Code.create({ ...req.body, owner: req.user._id })
// 		.then((code) => res.status(201).json(code))
// 		.catch(next);
// });

//AWS STUFF

router.post('/', requireToken, upload.single('img'), async (req, res, next) => {
	try {
		const s3file = await s3Files(req.file);
		const code = await Code.create({
			...req.body,
			imgUrl: s3file ? s3file.Location : 'https://i.imgur.com/TjZqVZB.jpg',
			img: s3file.Location,
			author: req.user._id,
		});
		res.json(code);
	} catch (err) {
		next(err);
	}
});
//update
router.put(
	'/:id',
	handleValidateId,
	requireToken,
	upload.single('img'),
	async (req, res, next) => {
		try {
			const s3file = await s3Files(req.file);
			const code = await Code.findById({
				...req.body,
				imgUrl: s3file ? s3file.Location : 'https://i.imgur.com/TjZqVZB.jpg',
				img: s3file === null ? req.body.img : s3file.Location,
				author: req.user._id,
			});
			res.json(code);
		} catch (err) {
			next(err);
		}
		// Code.findById(req.params.id)
		// 	.then(handleRecordExists)
		// 	.then((code) => handleValidateOwnership(req, code))
		// 	//.findByID(/:id)
		// 	//if req.file exists, then upload the img
		// 	//otherwise, save the data in req.body
		// 	.then((code) => code.set(req.body).save())
		// 	.then((code) => {
		// 		res.json(code);
		// 	})
		// 	.catch(next);
	}
);
//delete
router.delete('/:id', handleValidateId, requireToken, (req, res, next) => {
	console.log(req.params.id);
	Code.findById(req.params.id)
		.then(handleRecordExists)
		.then((code) => handleValidateOwnership(req, code))
		.then((code) => code.remove())
		.then(() => {
			res.sendStatus(204);
		})
		.catch(next);
});

module.exports = router;
