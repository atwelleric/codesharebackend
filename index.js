const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const codeController = require('./controllers/codes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', codeController);

app.set('port', process.envPORT || 4000);

app.listen(app.get('port'), () => {
	console.log('listening on port' + app.get('port'));
});
