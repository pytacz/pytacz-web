import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueResource from 'vue-resource'
import pl from 'vee-validate/dist/locale/pl'
import VeeValidate, { Validator } from 'vee-validate'
import parameters from '../config/parameters.js'

Validator.addLocale(pl);

Vue.use(VeeValidate, {
    locale: 'pl'
});

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.http.options.root = parameters.API;

Vue.router = router;
Vue.use(require('@websanova/vue-auth'), {
    auth: require('./drivers/auth.js'),
    http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    rolesVar: 'type',
    loginData: {url: 'auth/login', method: 'POST', fetchUser: true},
    fetchData: {url: 'auth/user', method: 'GET', enabled: true},
    refreshData: {url: 'auth/refresh', method: 'POST', enabled: true},
    registerData: {url: 'users', method: 'POST'},
    authRedirect: false
});

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});