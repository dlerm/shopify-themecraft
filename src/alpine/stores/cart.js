import * as cart from './theme-cart';
import { formatMoney } from '@shopify/theme-currency';

export const Cart = {
  formatMoney,

  drawer: {
    hidden: true,
    open() {
      this.hidden = false;
    },
    close() {
      this.hidden = true;
    },
    toggle() {
      this.hidden = !this.hidden;
    }
  },

  async update() {
    const data = await cart.getState();
    Object.keys(data).forEach((key) => this[key] = data[key]);
  },

  async addItem(id, options) {
    await cart.addItem(id, options).catch((error) => alert(error.description));
    await this.update();
  },

  async addItems(items) {
    await cart.addItems(items);
    await this.update();
  },

  async addItemByForm(form) {
    await cart.addItemByForm(form);
    await this.update();
  },

  async updateItem(key, options) {
    await cart.updateItem(key, options);
    await this.update();
  },

  async init() {
    await this.update();
  },
};

export default Cart;
