const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');

const logger = require('../commons/logger');
const conf = require('../commons/config');
const events = require('../events');

const router = new express.Router();
const app = express();

const server = (() => {
  let serverProcess;

  const start = () => new Promise((resolve) => {
    events.routes(router);

    app.use(morgan(':method :url :status :response-time ms'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cors());
    app.use('/', router);

    serverProcess = app.listen(conf.get('SERVER_PORT'), () => {
      logger.info(`[APP] Express server listening on port: ${serverProcess.address().port}`);

      resolve(app);
    });
  });

  const stop = () => new Promise((resolve) => {
    serverProcess.close(() => {
      resolve();
    });
  });

  return {
    start,
    stop
  };
})();

module.exports = server;