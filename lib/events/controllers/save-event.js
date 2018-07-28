const logger = require('../../commons/logger');
const { insertOne } = require('../repository');

const created = 201;
const internalServerError = 500;

const saveEventController = (() => {
  const saveEvent = async (req, res) => {
    try {
      const { body: newEvent } = req;
      const { ops: [insertedEvent] } = await insertOne(newEvent);
      res.status(created).send(insertedEvent);
    } catch (e) {
      logger.error(`Error on save event: ${e}`);
      res.status(internalServerError).end();
    }
  };

  return {
    saveEvent
  };
})();

module.exports = saveEventController;