import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: require('@/components/Home'),
            children: [
                {
                    path: '',
                    name: 'Main',
                    component: require('@/components/content/Main')
                }, {
                    path: '/notebook/:id',
                    name: 'Notebook',
                    component: require('@/components/content/Notebook')
                }
            ]
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
        }, {
            path: '*',
            name: '404',
            component: require('@/components/status/404')
        }
    ]
});
