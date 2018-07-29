module.exports = (array, field) => {
  array.sort((a,b) => {
    const dateA = new Date(a[field]).getTime();
    const dateB = new Date(b[field]).getTime();
    return dateA < dateB ? 1 : -1;
  });
};