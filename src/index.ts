import Vue from 'vue'
import VueI18n from 'vue-i18n'
import VueRouter, { RouteConfig } from 'vue-router'
import App from './App.vue'
import TopicsApp from './components/TopicsApp.vue'
import TopicApp from './components/TopicApp.vue'
import UserApp from './components/UserApp.vue'
import AuthApp from './components/AuthApp.vue'
import { en_US } from './locales/en-US'
import { ru_RU } from './locales/ru-RU'

Vue.use(VueI18n)
Vue.use(VueRouter)

const viewNames = [
    {url: 'topics', component: TopicsApp},
    {url: 'topics/:id', component: TopicApp},
    {url: 'users/:id', component: UserApp},
    {url: 'auth', component: AuthApp},
    {url: '*', component: TopicsApp}
]

const routes = viewNames.map((view): RouteConfig => ({
    path: '/' + view.url,
    component: view.component,
    props: {
        context: view.url === '*' ? 'all' : view.url,
    }
}))

const router = new VueRouter({
    routes
})

const messages = {
    'en-US': en_US,
    'ru-RU': ru_RU,
}

const i18n = new VueI18n({
    locale: localStorage.getItem("lang") || "en-US",
    fallbackLocale: "en-US",
    messages
})

Vue.directive('title', {
    inserted: (el, binding) => document.title = binding.value,
    update: (el, binding) => document.title = binding.value
})

const app = new App({
    i18n,
    router
}).$mount('#app')