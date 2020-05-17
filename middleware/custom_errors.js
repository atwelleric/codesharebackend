const mongoose = require('mongoose');

class OwnershipError extends Error {
	constructor() {
		super();
		this.name = 'OwnershipError';
		this.statusCode = 401;
		this.message = 'You must be tired? Because you messed up on the token';
	}
}

class DocumentNotFoundError extends Error {
	constructor() {
		super();
		this.name = 'DocumentNotFoundError';
		this.statusCode = 404;
		this.message = 'You messed up on the ID, try again';
	}
}

class BadParamsError extends Error {
	constructor() {
		super();
		this.name = 'BadParamsError';
		this.statusCode = 422;
		this.message = 'How you mess up on params?';
	}
}

class BadCredentialsError extends Error {
	constructor() {
		super();
		this.name = 'BadCredentialsError';
		this.statusCode = 422;
		this.message = 'Wrong username and password? You trippin';
	}
}

class InvalidIdError extends Error {
	constructor() {
		super();
		this.name = 'InvalidIdError';
		this.statusCode = 422;
		this.message = 'Wrong Id bro';
	}
}


const handleValidateOwnership = (req, document) => {
	const ownerId = document.owner._id || document.owner;
	if(!req.user._id.equals(ownerId)) {
		throw new OwnershipError();
	} else {
		return document;
	}
};

const handleRecordExists = (record) => {
	if (!record) {
		throw new DocumentNotFoundError();
	} else {
		return record;
	}
};

const handleValidateId = (req, res, next) => {
	const isValidId = mongoose.Types.ObjectId.isValid(req.params.id);
	if (!isValidId) {
		throw new InvalidIdError();
	} else {
		next();
	}
};

const handleValidateErrors = (err, req, res, next) => {
	if (err.name.match(/Valid/) || err.name === 'MongoError') {
	} else {
		next(err);
	}
};

const handleErrors = (err, req, res, next) => {
	const statusCode = err.statusCode || 500;
	const message = err.message || 'Internal Server Error';
	res.status(statusCode).send(message);
};


module.exports = {
	handleValidateOwnership,
	handleRecordExists,
	handleValidateId,
	handleValidateErrors,
	handleErrors,
};