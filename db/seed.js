const Code = require('../models/code');
const seedData = require('./seeds.json');
const User = require('../models/user');


Code.deleteMany()
	.then(() => Code.insertMany(seedData))
	.then(console.log)
	.catch(console.error)
	.finally(process.exit);
