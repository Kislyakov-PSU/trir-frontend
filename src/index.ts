import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import MainApp from './components/MainApp.vue'

const viewNames = ['topics', 'topics/:id', 'users/:id', 'auth', 'admin', '*']

const routes = viewNames.map((view): RouteConfig => ({
    path: '/' + view,
    component: MainApp,
    props: {
        currentView: view === '*' ? 'all' : view,
    }
}))

const router = new VueRouter({
    routes
})

Vue.use(VueRouter)

const app = new Vue({
    router,
    template: '<router-view></router-view>'
}).$mount('#app')