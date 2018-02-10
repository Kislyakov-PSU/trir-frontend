<template>
    <section class="app">
        <header>
            <h1>Forum</h1>
            <router-link to="/topics">Topics</router-link>
            <router-link to="/auth" v-if="!authorized">Login</router-link>
        </header>
        <topic-app v-if="activePage('topics') || activePage('all') || activePage('topics/:id')" :context="context"></topic-app>
        </main>
        <user-app v-if="activePage('users/:id')" :context="context"></user-app>
        <auth-app v-if="activePage('auth')" :context="context"></auth-app>
    </section>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import TopicApp from './TopicApp.vue'
import UserApp from './UserApp.vue'
import AuthApp from './AuthApp.vue'

@Component({
    components: {
        TopicApp,
        UserApp,
        AuthApp,
    }
})
export default class MainApp extends Vue {
    @Prop()
    currentView!: string
    
    authorized: boolean = false
    
    activePage(page: string) {
        return page == this.context
    }
    
    get context() {
        return this.currentView
    }
    
    @Watch("$route")
    handleAuthorization() {
        if (sessionStorage.getItem("jwt") === null) {
            this.authorized = false
        } else {
            this.authorized = true
        }
    }
    
    mounted() {
        this.handleAuthorization()
    }
}
</script>
<style lang="scss">
body {
    background: #F2F2F2;
    color: #404040;
}
.app {
    font: 1rem sans-serif;
    width: 80%;
    max-width: 860px;
    margin: 0 auto;
    
    a {
        text-decoration: none;
    }
    
    header {
        a {
            color: #488BC9;
            padding: 5px;
            
            &:first-of-type {
                padding-left: 0;
            }
            
            &.router-link-active {
                font-weight: bold;
            }
        }
    }
}
</style>