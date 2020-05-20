require('dotenv').config();

const AWS = require('aws-sdk');
const s3 = new AWS.S3();
const uuid = require('uuid');

const s3Upload = (file) => {
	if (file) {
		return new Promise((resolve, reject) => {
			const params = {
				Bucket: 'codesharestorage',
				Key: `${uuid.v4()}_${file.originalname}`,
				Body: file.buffer,
				ContentType: file.mimetype,
				ACL: 'public-read',
			};
			s3.upload(params, (err, data) => {
				if (err) {
					reject(err);
				} else {
					resolve(data);
				}
			});
		});
	} else {
		return null;
	}
};

module.exports = s3Upload;
