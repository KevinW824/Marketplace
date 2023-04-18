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

const user = {
  fn: 'test',
  ln: 'test',
  email: 'test@example.com',
  phone: '123456789',
  password: 'password',
};

test('Post New User', async () => {
  await request.post('/v0/signup')
    .send(user)
    .expect(201);
});

test('Authentication test success', async () => {
  await request.post('/authenticate')
    .send(user)
    .expect(200);
});

const wrongpassword = {
  email: 'test@example.com',
  password: 'wrong',
};

test('Authentication test fail', async () => {
  await request.post('/authenticate')
    .send(wrongpassword)
    .expect(401);
});
