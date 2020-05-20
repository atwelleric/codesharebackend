const mongoose = require('../db/connection');

const codeSchema = new mongoose.Schema(
	{
		title: String,
		img: String,
		body: String,
		description: String,
		author: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true
		}
	},
	{
		timestamp: true,
	},

);

module.exports = mongoose.model('Code', codeSchema);
