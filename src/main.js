import "@/styles/index.css";
import Alpine from "alpinejs";
import AsyncAlpine from "async-alpine";
// import focus from "@alpinejs/focus";
// import collapse from "@alpinejs/collapse"
// import intersect from "@alpinejs/intersect"
import "virtual:svg-icons-register";
window.Alpine = Alpine;

// Store Imports
import Global from "@/alpine/stores/global";
import Cart from "@/alpine/stores/cart";
import PDP from "@/alpine/stores/pdp";
import Modal from "@/alpine/stores/modal";

// Component Imports
// import SampleSyncComponent from "@/alpine/components/SampleSyncComponent";

// Plugins
Alpine.plugin(AsyncAlpine);
// Alpine.plugin(focus);
// Alpine.plugin(collapse);
// Alpine.plugin(intersect);

// Store Initialization
Alpine.store('global', Global);
Alpine.store('cart', Cart);
Alpine.store('pdp', PDP);
Alpine.store('modal', Modal);

// Component Initialization
// Alpine.data('SampleSyncComponent', SampleSyncComponent);

// Dynamic Component Initialization
// Alpine.asyncData('SampleAsyncComponent', () => import('@/alpine/components/SampleAsyncComponent.js'))

Alpine.start();
