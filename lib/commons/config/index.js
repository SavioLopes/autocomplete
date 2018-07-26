const nconf = require('nconf');

nconf.argv()
  .env()
  .file('conf/server.json')
  .defaults({
    SERVER_PORT: '3000'
  });

module.exports = nconf;