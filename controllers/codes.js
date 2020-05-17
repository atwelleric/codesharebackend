const express = require('express');
const Code = require('../models/code');
const router = express.Router();
const {
	handleValidateId,
	handleRecordExists,
	handleValidateOwnership,
} = require('../middleware/custom_errors');
const { requireToken } = require('../middleware/auth');

// index
router.get('/', (req, res, next) => {
	Code.find()
		// RETURNS EMPTY OBJECT, WHY??
		.populate('author', 'username -_id')
		.then((codes) => res.json(codes))
		.catch(next);
});

//show
router.get('/show/:id', (req, res, next) => {
	Code.findById(req.params.id)
		.populate('author', 'username -_id')
		.then((code) => res.json(code))
		.catch(next);
});
//create
router.post('/', requireToken, (req, res, next) => {
	Code.create({ ...req.body, owner: req.user._id })
		.then((code) => res.status(201).json(code))
		.catch(next);
});
//update
router.put('/:id', handleValidateId, requireToken, (req, res, next) => {
	Code.findById(req.params.id)
		.then(handleRecordExists)
		.then((code) => handleValidateOwnership(req, code))
		.then((code) => code.set(req.body).save())
		.then((code) => {
			res.json(code);
		})
		.catch(next);
});
//delete
router.delete('/:id', handleValidateId, requireToken, (req, res, next) => {
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
