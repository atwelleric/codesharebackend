const mongoose = require('../db/connection');

const codeSchema = new mongoose.Schema(
	{
		title: String,
		img: String,
		body: String,
		description: String,
	},
	{
		timestamp: true,
	}
);

module.exports = mongoose.model('Code', codeSchema);
