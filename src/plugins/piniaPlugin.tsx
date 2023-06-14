import { createPinia } from "pinia";
import { markRaw } from "vue";
import router from "@/router";

const piniaPlugin = createPinia();

/**
 * @description
 * This is to make the router available to the store.
 * This is needed for the router guards.
 * @see https://pinia.esm.dev/guide/usage.html#router-guards
 */
piniaPlugin.use(({ store }) => {
  store.router = markRaw(router);
});

export default piniaPlugin;