module.exports = (events) => {
  const dictionary = {};
    events.forEach(event => {
      const transaction_id = event.custom_data.find(c => c.key === 'transaction_id').value;
      if(!dictionary[transaction_id]) {
        dictionary[transaction_id] = {
          products: []
        };
      }
      if (event.event === 'comprou-produto') {
        const product = event.custom_data.reduce((p, customData) => {
          if (customData.key === 'product_name') {
            p.name = customData.value;
          }
          if (customData.key === 'product_price') {
            p.price = customData.value;
          }
          return p;
        }, {});
        dictionary[transaction_id]['products'].push(product);
      }
      if (event.event === 'comprou') {
        const store_name = event.custom_data.find(c => c.key === 'store_name').value;
        dictionary[transaction_id].timestamp = event.timestamp;
        dictionary[transaction_id].revenue = event.revenue;
        dictionary[transaction_id].store_name = store_name;
        dictionary[transaction_id].transaction_id = transaction_id;
      }
    });
    return dictionary;
};