import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/common/styles/reset/index.css"; // 格式化css样式
import "@/common/styles/elementUi/index.js";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
