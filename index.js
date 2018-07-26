const { connect: connectDb, close: closeDbConnection } = require('./lib/commons/database');
const logger = require('./lib/commons/logger');

(async () => {
  try {
    await connectDb();
  } catch (e) {
    logger.error(`Error on start server. Err: ${e}`);
  }
})();