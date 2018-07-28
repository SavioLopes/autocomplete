const { saveEvent } = require('./controllers');
const validationSchema = require('../commons/validation');

const routes = (router) => {
  router.post('/events', validationSchema.event, saveEvent);
};

module.exports = routes;