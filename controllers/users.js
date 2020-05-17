const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/users', (req, res, next) => {
	User.find().then((users) => res.json(users));
});

// sign up
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({ email: req.body.email, password });
		res.status(201).json(user);
	} catch (error) {
		return next(error);
	}
});

//sign in

module.exports = router;
