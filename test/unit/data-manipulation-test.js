const { assert } = require('chai');

const { dataManipulationEvents } = require('../../data-manipulation/data-manipulation');
const expectedResult = require('../fixture/manipulation-data-expected-result');

describe('#Unit Tests - Data manipulation', () => {
  it('Success manipulation data', async () => {
    const result = await dataManipulationEvents();
    assert.deepEqual(result, expectedResult);
  });
});