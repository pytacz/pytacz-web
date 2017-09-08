import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: require('@/components/Home')
        }, {
            path: '/register',
            name: 'Register',
            component: require('@/components/user/Register'),
            meta: {auth: false}
        }, {
            path: '/login',
            name: 'Login',
            component: require('@/components/user/Login'),
            meta: {auth: false}
        },
    ]
});
