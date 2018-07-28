const config = require('../lib/commons/config');

before('Sobrescreve a url do banco', async () => {
  config.set('MONGO_CONNECTION', `${config.get('MONGO_CONNECTION')}_test`);
});