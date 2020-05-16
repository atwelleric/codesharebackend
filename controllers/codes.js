const express = require('express');
const Code = require('../models/code');
const router = express.Router();

// index
router.get('/', (req, res) => {
	Code.find().then((codes) => res.json(codes));
});
//show
router.get('/:id', (req, res) => {
	Code.findById(req.params.id).then((code) => res.json(code));
});
//create
router.post('/', (req, res) => {
	Code.create(req.body).then((code) => res.json(code));
});
//update
router.put('/:id', (req, res) => {
	Code.findOneAndUpdate({ _id: req.params.id }, req.body, {
		new: true,
	}).then((job) => {
		// If we didn't get a job back from the query
		if (!job) {
			// send a 404
			res.sendStatus(404);
		} else {
			// otherwise, send back the job
			res.json(job);
		}
	});
});
//delete
router.delete('/:id', (req, res) => {
	Code.findOneAndDelete({
		_id: req.params.id,
	}).then((job) => {
		// If we didn't get a job back from the query
		if (!job) {
			// send a 404
			res.sendStatus(404);
		} else {
			// otherwise, send back 204 No Content
			res.sendStatus(204);
		}
	});
});

module.exports = router;
