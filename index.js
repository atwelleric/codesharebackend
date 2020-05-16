const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const codeController = require('./controllers/codes');
const {handleErrors} = require('./middleware/custom_errors')


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', codeController);

app.use((err, req, res, next) => {
	const statuscode = err.statuscode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statuscode).send(message);
});

app.set('port', process.envPORT || 4000);


app.listen(app.get('port'), () => {
	console.log('listening on port' + app.get('port'));
});
