const getDefaultRequestConfig = () =>
  JSON.parse(
    JSON.stringify({
      credentials: 'same-origin',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json;'
      }
    })
  );

const fetchJSON = async (url, config) => {
  const response = await fetch(url, config);
  const json = await response.json();
  if (!response.ok) {
    console.error(json.description, json);
    throw json;
  }
  return await json;
};

export const cart = () => fetchJSON('/cart.js', getDefaultRequestConfig());

export const cartAdd = (id, quantity, properties) => {
  var config = getDefaultRequestConfig();

  config.method = 'POST';
  config.body = JSON.stringify({
    id: id,
    quantity: quantity,
    properties: properties
  });

  return fetchJSON('/cart/add.js', config);
};

/**
 * @param {Object[]} items 
 * @param {string|number} items[].id 
 * @param {string|number} items[].quantity 
 * @param {object|null} items[].properties
 */
export const cartMultiAdd = (items) => {
  var config = getDefaultRequestConfig();

  config.method = 'POST';
  config.body = JSON.stringify(items);

  return fetchJSON('/cart/add.js', config);
};

export const cartAddByForm = (formData) => {
  var config = getDefaultRequestConfig();
  delete config.headers['Content-Type'];

  config.method = 'POST';
  config.body = formData;

  return fetchJSON('/cart/add.js', config);
};

export const cartChange = (line, options) => {
  var config = getDefaultRequestConfig();

  options = options || {};

  config.method = 'POST';
  config.body = JSON.stringify({
    line: line,
    quantity: options.quantity,
    properties: options.properties
  });

  return fetchJSON('/cart/change.js', config);
};

export const cartClear = () => {
  var config = getDefaultRequestConfig();
  config.method = 'POST';

  return fetchJSON('/cart/clear.js', config);
};

export const cartUpdate = (body) => {
  var config = getDefaultRequestConfig();

  config.method = 'POST';
  config.body = JSON.stringify(body);

  return fetchJSON('/cart/update.js', config);
};

export const cartShippingRates = () => fetchJSON('/cart/shipping_rates.json', getDefaultRequestConfig());
