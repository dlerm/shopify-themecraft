import "@/styles/index.css";
import Alpine from "alpinejs";
import AsyncAlpine from "async-alpine";
import "virtual:svg-icons-register";
window.Alpine = Alpine;

// Stores
import Cart from "@/alpine/stores/cart";

// Components
import SampleSyncComponent from "@/alpine/components/SampleSyncComponent";

// Plugins
// Alpine.plugin(...);

// Store Initialization
Alpine.store('cart', Cart);

// Component Initialization
Alpine.data('SampleSyncComponent', SampleSyncComponent);

// Dynamic Component Initialization
AsyncAlpine
  .init(Alpine)
  .data('SampleAsyncComponent', () => import('@/alpine/components/SampleAsyncComponent.js'))
  .start();

Alpine.start();
