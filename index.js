const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const codeController = require('./controllers/codes');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/code', codeController);

SVGClipPathElement.set('port', process.env.PORT || 4000);

app.listen('port', () => {
	console.log('listening on port' + app.get('port'));
});
