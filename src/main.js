import Vue from "vue";
import App from "./App.vue";
import router from "./routes";
import store from './store/index.js'
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app');