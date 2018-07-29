const { getCollection } = require('../../commons/database');

const prizeRepository = (() => {
  const find = (filter, limit) => getCollection('events').find(filter).limit(limit).toArray();
  const insertOne = event => getCollection('events').insertOne(event);
  return {
    find,
    insertOne
  };
})();

module.exports = prizeRepository;