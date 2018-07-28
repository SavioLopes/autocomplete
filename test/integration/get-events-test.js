const { assert } = require('chai');
const request = require('supertest');

const server = require('../../lib/server');
const database = require('../../lib/commons/database');

describe('#Integration Tests - GET /events', () => {
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

    it('GET /events success - Should return 200', async () => {
      const events = [
        { event: 'test1', timestamp: new Date().toISOString() },
        { event: 'test2', timestamp: new Date().toISOString() },
        { event: 'event1', timestamp: new Date().toISOString() },
        { event: 'event2', timestamp: new Date().toISOString() } 
      ];
      await database.getCollection('events').insertMany(events);

      const query = 'event=te';
      const result = await request(app).get(`/events?${query}`);
      assert.strictEqual(result.statusCode, 200);
      assert.strictEqual(result.body.length, 2);
    });

    it('GET /events query size 1 - Should return 204', async () => {
      const events = [
        { event: 'test1', timestamp: new Date().toISOString() },
        { event: 'test2', timestamp: new Date().toISOString() }
      ];
      await database.getCollection('events').insertMany(events);

      const query = 'event=t';
      const result = await request(app).get(`/events?${query}`);
      assert.strictEqual(result.statusCode, 204);
    });

    it('GET /events query event not found - Should return 204', async () => {
      const events = [
        { event: 'test1', timestamp: new Date().toISOString() },
        { event: 'test2', timestamp: new Date().toISOString() }
      ];
      await database.getCollection('events').insertMany(events);

      const query = 'event=notFound';
      const result = await request(app).get(`/events?${query}`);
      assert.strictEqual(result.statusCode, 204);
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

    it('GET /events database closed - Should return 500', async () => {
      await database.close();
      const query = 'event=buy';
      const result = await request(app).get(`/events?${query}`);
      assert.strictEqual(result.statusCode, 500);
    });
  });
});