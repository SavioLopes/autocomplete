const request = require('request-promise');

const config = require('../lib/commons/config');

const requestStorage = (() => {
  const requestStorageEvents = async() => {
      const options = {
        uri: config.get("URL_STORAGE_EVENTS"),
        headers: {
          'User-Agent': 'Request-Promise'
        }
      };
      return await request(options);
  };

  return {
    requestStorageEvents
  };
})();

module.exports = requestStorage;