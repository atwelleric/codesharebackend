const express = require('express');
const Code = require('../models/code');
const router = express.Router();

// index
router.get('/', (req, res, next) => {
	Code.find()
		.then((codes) => res.json(codes))
		.catch(next);
});
//show
router.get('/:id', (req, res, next) => {
	Code.findById(req.params.id)
		.then((code) => res.json(code))
		.catch(next);
});
//create
router.post('/', (req, res, next) => {
	Code.create(req.body)
		.then((code) => res.json(code))
		.catch(next);
});
//update
router.put('/:id', (req, res, next) => {
	Code.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	})
		.then((code) => {
			if (!code) {
				res.sendStatus(404);
			} else {
				res.json(code);
			}
		})
		.catch(next);
});
//delete
router.delete('/:id', (req, res, next) => {
	Code.findOneAndDelete({
		_id: req.params.id,
	})
		.then((code) => {
			if (!code) {
				res.sendStatus(404);
			} else {
				res.sendStatus(204);
			}
		})
		.catch(next);
});

module.exports = router;
