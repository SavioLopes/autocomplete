const logger = require('../../commons/logger');
const { find } = require('../repository');

const ok = 200;
const noContent = 204;
const internalServerError = 500;
const minimumEventLength = 2;

const getEventsController = (() => {
  const getEvents = async (req, res) => {
    try {
      const { event } = req.query;
      const filter = {
        event: new RegExp(`^${event}`, 'i')
      };
      if (event.length < minimumEventLength) {
        return res.status(noContent).end();
      }
      const events = await find(filter);
      if (!events.length) {
        return res.status(noContent).end();
      }
      res.status(ok).send(events);
    } catch (e) {
      logger.error(`Error on get events: ${e}`);
      res.status(internalServerError).end();
    }
  };

  return {
    getEvents
  };
})();

module.exports = getEventsController;