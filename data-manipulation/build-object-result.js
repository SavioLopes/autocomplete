module.exports = (dictionary) => {
  const result = {
    timeline: []
  };
  Object.keys(dictionary).forEach(transaction_id => {
    result.timeline.push(dictionary[transaction_id]);
  });
  return result;
};