const { MongoClient: mongoClient } = require('mongodb');

const conf = require('../config');
const logger = require('../logger');

const dataBase = (() => {
  let client;
  let db;
  let collections = [];

  const connect = async () => {
    if (!client) {
      client = await mongoClient.connect(conf.get('MONGO_CONNECTION'), {
        useNewUrlParser: true
      });
      db = client.db();
    }
    logger.info('[MongoDB] Database connected.');
  };

  const close = async () => {
    try {
      if (!client) {
        return;
      }
      await client.close();
    } catch (err) {
      return err;
    } finally {
      client = undefined;
      db = undefined;
      collections = [];
    }
  };

  const getCollection = (name) => {
    if (!db) {
      return;
    }
    let collection = collections[name];
    if (!collection) {
      collection = db.collection(name);
      collections[name] = collection;
    }
    return collection;
  };

  return {
    connect,
    close,
    getCollection
  };
})();

module.exports = dataBase;