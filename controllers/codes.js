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
	}).then((code) => res.json(code));
});
//delete
router.delete('/:id', (req, res) => {
	Code.findOneAndDelete({
		_id: req.params.id,
	}).then((code) => res.json(code));
});

module.exports = router;
