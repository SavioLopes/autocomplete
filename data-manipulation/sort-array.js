module.exports = (obj) => {
  obj.timeline.sort((a,b) => {
    const dateA = new Date(a.timestamp).getTime();
    const dateB = new Date(b.timestamp).getTime();
    return dateA < dateB ? 1 : -1;
  });
};