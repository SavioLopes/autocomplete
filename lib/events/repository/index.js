const { getCollection } = require('../../commons/database');

const prizeRepository = (() => {
  const find = filter => getCollection('events').find(filter).toArray();
  const insertOne = event => getCollection('events').insertOne(event);
  return {
    find,
    insertOne
  };
})();

module.exports = prizeRepository;