import Vue from 'vue';
import Vant from 'vant';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from './router';
import store from './store';
import 'lib-flexible';
import 'vant/lib/index.css';

VueRouter.prototype.back = false;
VueRouter.prototype.goBack = function () {
  this.back = true;
  this.go(-1);
};
Vue.config.productionTip = false;
Vue.use(Vant);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
