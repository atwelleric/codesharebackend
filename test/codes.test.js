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
			.get('/5ec04b3d4b0a8a0fa692d418')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('object');
				done();
			});
	});
});
