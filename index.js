const { connect: connectDb, close: closeDbConnection } = require('./lib/commons/database');
const logger = require('./lib/commons/logger');
const server = require('./lib/server');

(async () => {
  try {
    await connectDb();
    await server.start();
  } catch (e) {
    logger.error(`Error on start server. Err: ${e}`);
    await server.stop();
    await closeDbConnection();
    process.exit(1);
  }
})();