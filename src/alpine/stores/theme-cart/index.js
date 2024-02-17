/**
 * Cart Template Script
 * ------------------------------------------------------------------------------
 * A file that contains scripts highly couple code to the Cart template.
 *
 * @namespace cart
 */

import * as request from './request';
import * as validate from './validate';

/**
 * Returns the state object of the cart
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */
export const getState = () => request.cart();

/**
 * Returns the index of the cart line item
 * @param {string} key The unique key of the line item
 * @returns {Promise} Resolves with the index number of the line item
 */
export const getItemIndex = async (key) => {
  validate.key(key);
  const state = await request.cart();
  const index = state.items.findIndex((item, i) => item.key === key);

  if (index === -1) {
    return Promise.reject(
      new Error('Cart: Unable to match line item with provided key')
    );
  }
  return index + 1;
};

/**
 * Fetches the line item object
 * @param {string} key The unique key of the line item
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */
export const getItem = async (key) => {
  validate.key(key);
  const state = await request.cart();
  const lineItem = state.items.find((item) => item.key === key);

  if (!lineItem) {
    return Promise.reject(
      new Error('Cart: Unable to match line item with provided key')
    );
  }
  return await lineItem;
};

/**
 * Add a new line item to the cart
 * @param {number} id The variant's unique ID
 * @param {object} options Optional values to pass to /cart/add.js
 * @param {number} options.quantity The quantity of items to be added to the cart
 * @param {object|null} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */
export const addItem = async (id, options) => {
  options = options || {};

  validate.id(id);
  if (options.quantity) validate.quantity(options.quantity);
  if (options.properties) validate.properties(options.properties);

  return await request.cartAdd(id, options.quantity, options.properties);
};

/**
 * Add multiple line items to the cart
 * @param {object[]} items Any array of items to add
 * @param {number} items[].id The item's variant id to be added to the cart
 * @param {number} items[].quantity The item's quantity to be added to the cart
 * @param {object} items[].properties The item's line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */
export const addItems = async (items) => {
  options = options || {};

  items.forEach((item) => {
    validate.id(item.id);
    if (item.quantity) validate.quantity(item.quantity);
    if (item.properties) validate.properties(item.properties);
  })

  return await request.cartMultiAdd(items);
};

/**
 * Add a new line item to the cart from a product form
 * @param {object} form DOM element which is equal to the <form> node
 * @returns {Promise} Resolves with the line item object (See response of cart/add.js https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#add-to-cart)
 */
export const addItemByForm = (form) => {
  validate.form(form);

  var formData = new FormData(form);
  validate.id(parseInt(formData.get('id'), 10));

  return request.cartAddByForm(formData);
};

/**
 * Changes the quantity and/or properties of an existing line item.
 * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)
 * @param {object} options Optional values to pass to /cart/add.js
 * @param {number} options.quantity The quantity of items to be added to the cart
 * @param {object} options.properties Line item property key/values (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-properties)
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */
export const updateItem = async (key, options) => {
  validate.key(key);
  validate.options(options);

  const line = await getItemIndex(key);

  return await request.cartChange(line, options);
};

/**
 * Removes a line item from the cart
 * @param {string} key The unique key of the line item (https://help.shopify.com/en/themes/liquid/objects/line_item#line_item-key)
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */
export const removeItem = async (key) => {
  validate.key(key);

  const line = await getItemIndex(key);
  return await request.cartChange(line, { quantity: 0 });
};

/**
 * Sets all quantities of all line items in the cart to zero. This does not remove cart attributes nor the cart note.
 * @returns {Promise} Resolves with the state object of the cart (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-cart)
 */
export const clearItems = () => request.cartClear();

/**
 * Gets all cart attributes
 * @returns {Promise} Resolves with the cart attributes object
 */
export const getAttributes = async () => {
  const state = await request.cart();
  return state.attributes;
};

/**
 * Sets all cart attributes
 * @returns {Promise} Resolves with the cart state object
 */
export const updateAttributes = (attributes) => request.cartUpdate({ attributes: attributes });

/**
 * Clears all cart attributes
 * @returns {Promise} Resolves with the cart state object
 */
export const clearAttributes = async () => {
  const attributes = await getAttributes();
  for (var key in attributes) {
    attributes[key] = '';
  }
  return await updateAttributes(attributes);
};

/**
 * Gets cart note
 * @returns {Promise} Resolves with the cart note string
 */
export const getNote = async () => {
  const state = await request.cart();
  return state.note;
};

/**
 * Sets cart note
 * @returns {Promise} Resolves with the cart state object
 */
export const updateNote = (note) => request.cartUpdate({ note: note });

/**
 * Clears cart note
 * @returns {Promise} Resolves with the cart state object
 */
export const clearNote = () => request.cartUpdate({ note: '' });

/**
 * Get estimated shipping rates.
 * @returns {Promise} Resolves with response of /cart/shipping_rates.json (https://help.shopify.com/en/themes/development/getting-started/using-ajax-api#get-shipping-rates)
 */
export const getShippingRates = () => request.cartShippingRates();
