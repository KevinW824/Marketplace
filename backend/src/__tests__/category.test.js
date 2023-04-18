const supertest = require('supertest');
const http = require('http');

const db = require('./db');
const app = require('../app');

let server;

beforeAll(() => {
  server = http.createServer(app);
  server.listen();
  request = supertest(server);
  return db.reset();
});

afterAll((done) => {
  server.close(done);
});

test('GET Invalid URL', async () => {
  await request.get('/v0/categors/').expect(404);
});

test('GET Category Vehicles', async () => {
  await request
    .get('/v0/category/vehicles')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.sub).toBeDefined();
      expect(res.body.sub[0]).toBeDefined();
      expect(res.body.sub[0]).toEqual('Boats');
      expect(res.body.filter).toBeDefined();
      expect(res.body.filter[0].name).toBeDefined();
      expect(res.body.filter[0].name).toEqual('Sort by');
      expect(res.body.filter[0].type).toBeDefined();
      expect(res.body.filter[0].type).toEqual('radio');
      expect(res.body.filter[0].value).toBeDefined();
      expect(res.body.filter[0].value[0]).toEqual('Recommended');
    });
});

test('GET Invalid Category', async () => {
  await request.get('/v0/category/foobar').expect(404);
});

test('GET No Category', async () => {
  await request.get('/v0/category').expect(404);
});
