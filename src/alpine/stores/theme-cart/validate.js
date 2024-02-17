export const key = (key) => {
  if (typeof key !== 'string' || key.split(':').length !== 2) {
    throw new TypeError('Cart: Provided key value is not a string with the format xxx:xxx');
  }
};

export const quantity = (quantity) => {
  if (typeof quantity !== 'number' || isNaN(quantity)) {
    throw new TypeError('Cart: An object which specifies a quantity or properties value is required');
  }
};

export const id = (id) => {
  if (typeof id !== 'number' || isNaN(id)) {
    throw new TypeError('Cart: Variant ID must be a number');
  }
};

export const properties = (properties) => {
  if (typeof properties !== 'object') {
    throw new TypeError('Cart: Properties must be an object');
  }
};

export const form = (form) => {
  if (!(form instanceof HTMLFormElement)) {
    throw new TypeError('Cart: Form must be an instance of HTMLFormElement');
  }
};

export const options = (options) => {
  if (typeof options !== 'object') {
    throw new TypeError('Cart: Options must be an object');
  }

  if (
    typeof options.quantity === 'undefined' &&
    typeof options.properties === 'undefined'
  ) {
    throw new Error('Cart: You muse define a value for quantity or properties');
  }

  if (typeof options.quantity !== 'undefined') {
    quantity(options.quantity);
  }

  if (typeof options.properties !== 'undefined') {
    properties(options.properties);
  }
};
