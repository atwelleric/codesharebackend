require('dotenv').config();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const uuid = require('uuid');

const s3Upload = (file) => {
	return new Promise((resolve, reject) => {
		const params = {
			Bucket: 'codesharestorage',
			Key: `${uuid.v4()}_${file.originalname}`,
			Body: file.buffer,
			ContentType: file.mimetype,
			ACL: 'public-read',
		};
		s3Upload(params, (err, data) => {
			if (err) {
				reject(err);
			} else {
				resolve(data);
			}
		});
	});
};

module.exports = s3Upload;
