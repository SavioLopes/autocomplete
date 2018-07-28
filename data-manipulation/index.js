const { requestStorageEvents } = require('./request-storage-events')
const buildObjectResult = require('./build-object-result');
const buildToDictionary = require('./build-dictionary');
const sort = require('./sort-array');

const manipulationData = (() => {
  const manipulationDataEvents = async () => {
    const result = await requestStorageEvents();
    const { events } = JSON.parse(result);
    const dictionary = buildToDictionary(events);
    const objResult = buildObjectResult(dictionary);
    sort(objResult);
    return objResult;
  };

  return {
    manipulationDataEvents
  };
})();

module.exports = manipulationData;