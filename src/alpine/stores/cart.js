import * as cart from './theme-cart';
import { formatMoney } from './theme-cart/currency';

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

  searchParams: new URLSearchParams(window.location.search),

  moneyFormats: {
    AMOUNT_NO_TRAILING_ZEROS: `${window.theme.currency.symbol}{{amount}}`,
    AMOUNT_NO_TRAILING_ZEROS: `${window.theme.currency.symbol}{{amount_no_trailing_zeros}}`,
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

    const triggerCart = this?.searchParams?.get('cart');
    if (triggerCart) this.drawer.open();
  },

  // includes(variantId) {
  //   return this?.items?.some((item) => item.variant_id == variantId);
  // },

  // hasSubscription() {
  //   return this?.items?.some((item) => !!item?.selling_plan_allocation);
  // },

  // subscriptionItemCount() {
  //   return this?.items?.filter((item) => !!item?.selling_plan_allocation)?.length;
  // }
};

export default Cart;
