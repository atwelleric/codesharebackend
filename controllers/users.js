const express = require('express');
const User = require('../models/user');
const router = express.Router();
const bcrypt = require('bcrypt');
const { createUserToken } = require('../middleware/auth');

router.get('/', (req, res, next) => {
	User.find()
		.then((users) => res.json(users))
		.catch(next);
});

// sign up
router.post('/signup', async (req, res, next) => {
	try {
		const password = await bcrypt.hash(req.body.password, 10);
		const user = await User.create({
			email: req.body.email,
			password,
			username: req.body.username,
		});
		res.status(201).json(user);
	} catch (error) {
		return next(error);
	}
});

//sign in
router.post('/signin', (req, res, next) => {
	User.findOne({ username: req.body.username })
		.then((User) => createUserToken(req, User))
		.then((token) =>
			res.json({
				token: token,
				username: req.body.username,
				email: req.body.email,
			})
		)
		.catch(next);
});
module.exports = router;
