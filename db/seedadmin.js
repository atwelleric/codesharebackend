const User = require('../models/user');
const seedAdmin = require('./seedadmin');

User.deleteMany()
	.then(() => User.insertMany(seedAdmin))
	.then(console.log)
	.catch(console.error)
	.finally(process.exit);
