const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const codeController = require('./controllers/codes');
const userController = require('./controllers/users');
const { handleErrors } = require('./middleware/custom_errors');
const multer = require('multer');
const upload = multer();
const s3Files = require('./middleware/s3files');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', codeController);
app.use('/users', userController);

app.use((err, req, res, next) => {
	const statuscode = err.statuscode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statuscode).send(message);
});
// might have to move over app.use
app.post('/users', upload.single('avatar'), async (req, res, next) => {
	const s3file = await s3Files(req.file);
	userController.create({
		...req.body,
		avatarUrl: s3file || 'https://imgur.com/rNgn3kQ',
	});
});

app.set('port', process.envPORT || 4000);

app.listen(app.get('port'), () => {
	console.log('listening on port' + app.get('port'));
});
