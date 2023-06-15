import "./style.css";
import "vue-toast-notification/dist/theme-sugar.css";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import App from "./App.vue";
import FontAwesomeIcon from "./plugins/fontawesome";
import ToastPlugin from "vue-toast-notification";
import { createApp } from "vue";
import piniaPlugin from "./plugins/piniaPlugin";
import router from "./router";
// import QuizSetPlugin from "./plugins/QSetPlugin";

createApp(App)
  .use(router)
  .use(ToastPlugin)
  .use(piniaPlugin)
  // .use(new QuizSetPlugin.install(App,{}))
  .component("fa", FontAwesomeIcon)
  .mount("#app");