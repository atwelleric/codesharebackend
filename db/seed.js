const Code = require('../models/code');
const seedData = require('./seeds.json');
const User = require('../models/user');

const setUser = async () => {
	try {
		if (!process.argv[2]) {
			throw new Error('to seed the database provide admin email');
		}
		const user = await User.findOne({ email: process.argv[2] });
		if (!user) {
			throw new Error('Incorrect Email');
		}
		return user;
	} catch (error) {
		console.error(error);
	}
};
Code.deleteMany()
	.then(setUser)
	.then((user) => {
		const seedDataWithAuthor = seedData.map((code) => {
			code.author = user._id;
			return code;
		});
		return Code.insertMany(seedDataWithAuthor);
	})
	.then(console.log)
	.then(console.error)
	.finally(() => {
		process.exit();
	});
