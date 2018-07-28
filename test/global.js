const { connect: connectDb } = require('../lib/commons/database');
const config = require('../lib/commons/config');

before('Sobrescreve a url do banco', async () => {
  config.set('MONGO_CONNECTION', `${config.get('MONGO_CONNECTION')}_test`);
  await connectDb();
});

after('Remove a base de dados usada para testes', async () => {
  // await client.db().dropDatabase();
  // await client.close();
});