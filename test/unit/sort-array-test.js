const { assert } = require('chai');

const sort = require('../../data-manipulation/sort-array');

describe('#Unit Test - Sort array', () => {
  it('Sort a array with 3 elements', () => {
    const initialArray = [
      { item: '1', timestamp: '2018-01-01T12:00:00.0000000-03:00' },
      { item: '2', timestamp: '2018-02-01T12:00:00.0000000-03:00' },
      { item: '3', timestamp: '2018-03-01T12:00:00.0000000-03:00' }
    ];
    const expectedArray = [
      { item: '3', timestamp: '2018-03-01T12:00:00.0000000-03:00' },
      { item: '2', timestamp: '2018-02-01T12:00:00.0000000-03:00' },
      { item: '1', timestamp: '2018-01-01T12:00:00.0000000-03:00' }
    ];
    sort(initialArray, 'timestamp');
    assert.deepEqual(initialArray, expectedArray);
  });
});