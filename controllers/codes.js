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
			img: s3file ? s3file.Location : 'https://i.imgur.com/1hOxlPe.png',
			author: req.user._id,
		});
		console.log(code.img);
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
			console.log(s3file);
			console.log(req.body);
			if (s3file) {
				const code = await Code.findOneAndUpdate(
					{ _id: req.params.id },
					{
						...req.body,
						img: s3file.Location,
					},
					{ new: true }
				);
				console.log(code);
				res.json(code);
			} else {
				const code = await Code.findOneAndUpdate(
					{ _id: req.params.id },
					{
						...req.body,
					},
					{ new: true }
				);
				console.log(code);
				res.json(code);
			}
		} catch (err) {
			next(err);
		}
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
