const { dataManipulationEvents } = require('./data-manipulation');
const logger = require('../lib/commons/logger');

(async () => {
  const result = await dataManipulationEvents();
  logger.info(JSON.stringify(result));
})();