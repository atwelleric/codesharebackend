const should = require('chai').should();
const expect = require('chai').expect;
const supertest = require('supertest');
const api = supertest('http://localhost:4000');

//target all the codes
describe('GET /codes', () => {
	it('should return a array', (done) => {
		api
			.get('/codes')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.be.an('object');
			});
		done();
	});
});

describe('GET /codes/:id', () => {
	it('should return arrays id', (done) => {
		api
			.get('/codes/5ec04b3d4b0a8a0fa692d418')
			.set('Accept', 'application/json')
			.end((error, response) => {
				expect(response.body).to.include.all.keys('_id');
				done();
			});
	});
});
