const { assert } = require('chai');
const request = require('supertest');

const server = require('../../lib/server');
const database = require('../../lib/commons/database');

describe('#Integration Tests - POST /events', () => {
  describe('Success case', () => {
    let app;

    before(async () => {
      await database.connect();
      app = await server.start();
    });

    afterEach(async () => {
      await database.getCollection('events').drop();
    });

    after(async () => {
      await database.getCollection('events').remove();
      await database.close();
      await server.stop();
    });

    it('POST /events success - Should return 201', async () => {
      const body = {
        event: 'test',
        timestamp: new Date().toISOString()
      };

      const result = await request(app).post('/events').send(body);
      assert.strictEqual(result.statusCode, 201);
      const events = await database.getCollection('events').find().toArray();
      events[0]._id = events[0]._id.toString();
      assert.strictEqual(events.length, 1);
      assert.deepEqual(result.body, events[0]);
    });
  });

  describe('Error cases', () => {
    let app;

    before(async () => {
      await database.connect();
      app = await server.start();
    });

    after(async () => {
      await database.close();
      await server.stop();
    });

    it('POST /events missing required propertie "event" - Should return 400', async () => {
      const body = {
        timestamp: new Date().toISOString()
      };

      const result = await request(app).post('/events').send(body);
      assert.strictEqual(result.statusCode, 400);
    });

    it('POST /events invalid data type "event" - Should return 400', async () => {
      const body = {
        event: 123456,
        timestamp: new Date().toISOString()
      };

      const result = await request(app).post('/events').send(body);
      assert.strictEqual(result.statusCode, 400);
    });

    it('POST /events database closed - Should return 500', async () => {
      await database.close();
      const body = {
        event: 'test',
        timestamp: new Date().toISOString()
      };

      const result = await request(app).post('/events').send(body);
      assert.strictEqual(result.statusCode, 500);
    });
  });
});