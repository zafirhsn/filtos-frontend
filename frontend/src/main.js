import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import {routes} from './routes';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';
import VueMeta from 'vue-meta';
import Bugsnag from '@bugsnag/js';
import BugsnagPluginVue from '@bugsnag/plugin-vue';

Bugsnag.start({
  apiKey: "5b9fda594cdcd91241a901fb6870b9e1",
  plugins: [new BugsnagPluginVue()]
})

const bugsnagVue = Bugsnag.getPlugin('vue');
bugsnagVue.installVueErrorHandler(Vue);
window.Bugsnag = Bugsnag;

Vue.config.productionTip = false

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(VueMeta);
Vue.mixin({
  data() {
    return {
      css: {
        main: "#852196",
        dark: "#581663",
        light: "#C85DE3",
        spotify: "#1DB954",
        sheetBackground: "#D376E340"
      }
    }
  }
})


const router = new VueRouter({
  routes,
  mode: "history"
})

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
