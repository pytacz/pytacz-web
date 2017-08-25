import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vueResource from 'vue-resource'

Vue.config.productionTip = false;
Vue.use(vueResource);
Vue.http.headers.common['Access-Control-Allow-Origin'] = '*';
Vue.http.options.root = 'http://api.pytacz.local/';
Vue.http.options.emulateJSON = true;

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
});

Vue.router = router;
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/vue-resource.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    loginData: {url: 'login', method: 'POST'},
    rolesVar: 'type'
});
