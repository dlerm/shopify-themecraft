
import { getSizedImageUrl, getSrcsetForWidths } from "@/utils/images";

const SCREENS = {
  'xxs': 0,
  'xs': 1,
  'sm': 2,
  'md': 3,
  'lg': 4,
  'xl': 5,
  '2xl': 6,
};

export const Global = {
  SCREENS,
  screen: SCREENS.sm,
  scrollYDirection: 0,
  scrollY: 0,
  navAnnouncementBarHeight: 0,
  navHeight: 0,
  geolocation: '',
  menuOpen: false,
  mobileMenuOpen: false,

  getSizedImageUrl,
  getSrcsetForWidths,

  announcementBarOpen: true,

  get navHidden() { return this.scrollYDirection === -1 && this.scrollY > this.navHeight },

  init() {
    setTimeout(() => {
      this.updateScreen();
      this.updateScroll();
      this.parseGeoLocation();
      if (!this.geolocation) this.requestGeoLocation();
    }, 0);
  },

  updateScreen() {
    if (window.innerWidth >= 320 && window.innerWidth < 375) this.screen = SCREENS.xxs;
    if (window.innerWidth >= 375 && window.innerWidth < 640) this.screen = SCREENS.xs;
    if (window.innerWidth >= 640 && window.innerWidth < 768) this.screen = SCREENS.sm;
    if (window.innerWidth >= 768 && window.innerWidth < 1024) this.screen = SCREENS.md;
    if (window.innerWidth >= 1024 && window.innerWidth < 1280) this.screen = SCREENS.lg;
    if (window.innerWidth >= 1280 && window.innerWidth < 1440) this.screen = SCREENS.xl;
    if (window.innerWidth >= 1440) this.screen = SCREENS['2xl'];
  },

  updateScroll() {
    if (this.scrollY > window.scrollY) this.scrollYDirection = 1; // up
    else if (this.scrollY < window.scrollY) this.scrollYDirection = -1; // down
    else this.scrollYDirection = 0;
    this.scrollY = window.scrollY;
  },

  parseGeoLocation() {
    const geolocationRaw = window.localStorage.getItem('_geolocation') || false;
    if (!geolocationRaw) return;
    try {
      this.geolocation = JSON.parse(geolocationRaw);
    } catch (e) {
      console.error('Could not parse geolocation storage');
    }
  },

  async requestGeoLocation() {
    const res = await fetch('/browsing_context_suggestions.json').then((res) => res.json()).catch(console.error);
    if (!res) return;
    const country = res?.detected_values?.country;
    if (!country) return;
    this.geolocation = country;
    window.localStorage.setItem('_geolocation', JSON.stringify(country));
  },
};

export default Global;
