import Vue from 'vue'

import App from './App.vue'

import router from './router'

import BootstrapVue from "bootstrap-vue"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap-vue/dist/bootstrap-vue.css"
Vue.use(BootstrapVue)

import Vuex from 'vuex';
Vue.use(Vuex);

import VeeValidate from 'vee-validate';
Vue.use(VeeValidate);

import feather from 'vue-icon';
Vue.use(feather, 'v-icon');

import { store } from './store/store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
