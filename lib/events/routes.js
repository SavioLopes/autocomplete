const { saveEvent, getEvents } = require('./controllers');
const validationSchema = require('../commons/validation');

const routes = (router) => {
  router.post('/events', validationSchema.event, saveEvent);
  router.get('/events', getEvents);
};

module.exports = routes;