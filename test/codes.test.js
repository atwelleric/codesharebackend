const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');
//target all the codes
describe('GET /', () => {
	it('should return a array', (done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('array');
			});
		done();
	});
});
describe('GET /:id', () => {
	it('should return one object by id', (done) => {
		api
			.get('/5ec0ac641b288e290019d437')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('object');
				done();
			});
	});
});
describe('POST /', () => {
	const newCode = {
		title: 'testing',
		img: 'https://imgur.com/NHKdiSo',
		body: 'some photos',
		description: '',
	};
	before((done) => {
		api
			.post('/')
			.set('Accept', 'application/json')
			.send(newCode)
			.end(() => {
				done();
			});
	});
	it('should add a new code to array', (done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const codeToFind = response.body.find((code) => code.id === newCode.id);
				expect(codeToFind).to.be.an('object');
				done();
			});
	});
});

// NOTE
// tests below not working correctly, I believe it is because of a user verification issue, and I am not sure how to authenticate user in a test.

describe('PUT /:id', () => {
	const updateNewCode = {
		title: 'Too many test codes',
	};
	before((done) => {
		api
			.put('/5ec0ac641b288e290019d437')
			.set('Accept', 'application/json')
			.send(updateNewCode)
			.end(() => {
				done();
			});
	});
	it('should update code to the object', (done) => {
		api
			.get(`/${updateNewCode._id}`)
			.set('Access', 'application/json')
			.end((error, response) => {
				expect(response.body).to.have.property('title', 'Too many test codes');
				done();
			});
	});
});
describe('DELETE /:id', () => {
	let codeToDelete;
	before((done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const codes = response.body;
				codeToDelete = codes[codes.length - 1]._id;
				done();
			});
	});
	before((done) => {
		api.delete(`/${codeToDelete}`).end(done);
	});
	it('should delete a code from array', (done) => {
		api
			.get('/')
			.set('Accept', 'application/json')
			.end((error, response) => {
				const deleteCode = response.body.find(
					(code) => code._id === codeToDelete
				);
				expect(deleteCode).to.equal(undefined);
				done();
			});
	});
});
