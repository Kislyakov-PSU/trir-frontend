<template lang="pug">
    section
        header
            h1(v-t='"main.forum"')
            router-link(to='/topics', v-t='"links.topics"')
            router-link(to='/auth', v-if='!authorized', v-t='"links.login"')
        transition(name='fade', mode='out-in')
            router-view(v-title='title')
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'

@Component
export default class App extends Vue {
    authorized: boolean = false
    
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
    
    get title() {
        return this.$i18n.t("main.forum")
    }
}
</script>

<style lang="scss">
body {
    background: #F2F2F2;
    color: #404040;
}

.fade-enter-active, .fade-leave-active {
    transition: all .15s ease;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}

a {
    text-decoration: none;
    color: #488bc9;
}
</style>

<style lang="scss" scoped>
section {
    font: 1rem sans-serif;
    width: 80%;
    max-width: 860px;
    margin: 0 auto;
    
    header {
        a {
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