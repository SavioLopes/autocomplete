const { assert } = require('chai');

const { manipulationDataEvents } = require('../../data-manipulation');
const expectedResult = require('../fixture/manipulation-data-expected-result');

describe('#Unit Tests - Data manipulation', () => {
  it('Success manipulation data', async () => {
    const result = await manipulationDataEvents();
    assert.deepEqual(result, expectedResult);
  });
});