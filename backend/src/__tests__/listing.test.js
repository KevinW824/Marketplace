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

test('GET TodaysPicks', async () => {
  await request.get('/v0/todaysPicks')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toEqual(14);
    });
});
test('GET an available category test 1', async () => {
  await request.get('/v0/todaysPicks/?category=vehicles')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      expect(res.body).toBeDefined();
      expect(res.body.length).toEqual(3);
      let categoryChecker = false;
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].category === 'vehicles') {
          categoryChecker = true;
        }
      }
      expect(categoryChecker).toEqual(true);
    });
});

test('GET an available category test 2', async () => {
  await request.get('/v0/todaysPicks/?category=toys')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      console.log(res.body);
      expect(res.body).toBeDefined();
      expect(res.body.length).toEqual(3);
      let categoryChecker = false;
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].category === 'toys') {
          categoryChecker = true;
        }
      }
      expect(categoryChecker).toEqual(true);
    });
});
test(`GET an available category test 3, checking to see if shoes is a
 subcategory`, async () => {
  await request.get('/v0/todaysPicks/?category=apparel')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      console.log(res.body);
      expect(res.body).toBeDefined();
      expect(res.body.length).toEqual(6);
      let categoryChecker = false;
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].category === 'shoes') {
          categoryChecker = true;
        }
      }
      expect(categoryChecker).toEqual(true);
    });
});
test(`GET an available category test 4, checking to see if phone is a
  subcategory`, async () => {
  await request.get('/v0/todaysPicks/?category=electronics')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      console.log(res.body);
      expect(res.body).toBeDefined();
      expect(res.body.length).toEqual(2);
      let categoryChecker = false;
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].category === 'phones') {
          categoryChecker = true;
        }
      }
      expect(categoryChecker).toEqual(true);
    });
});
test('GET an available subcategory test 1', async () => {
  await request.get('/v0/todaysPicks/?category=boats')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      console.log(res.body);
      expect(res.body).toBeDefined();
      // there are only two boats in data.sql
      expect(res.body.length).toEqual(2);
      let categoryChecker = false;
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].category === 'boats') {
          categoryChecker = true;
        }
      }
      expect(categoryChecker).toEqual(true);
    });
});
test('GET an available subcategory test 2', async () => {
  await request.get('/v0/todaysPicks/?category=shoes')
    .expect(200)
    .expect('Content-Type', /json/)
    .then((res) => {
      expect(res).toBeDefined();
      console.log(res.body);
      expect(res.body).toBeDefined();
      // there are only four shoes in data.sql
      expect(res.body.length).toEqual(4);
      let categoryChecker = false;
      for (let i = 0; i < res.body.length; i++) {
        if (res.body[i].category === 'shoes') {
          categoryChecker = true;
        }
      }
      expect(categoryChecker).toEqual(true);
    });
});
test('GET an unavailable category', async () => {
  await request.get('/v0/todaysPicks/?category=candy')
    .expect(404);
});
