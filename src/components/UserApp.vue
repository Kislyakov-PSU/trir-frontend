<template>
    <main id="user-app">
        <div v-if="!loaded">Loading...</div>
        <h1>#{{user.id}} - {{user.username}}</h1>
        <span>Group: {{user.group}}</span>
    </main>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { User } from '../models'

@Component
export default class UserApp extends Vue {
    @Prop() context!: string
    
    loading: boolean = false
    user: User | null = null
    
    created() {
        this.loadUser()
    }
    
    @Watch("$route")
    loadUser() {
        this.loading = true
        fetch("http://localhost:9000", {
            method: "POST",
            body: `{
                user(id: ${this.userId}) {
                    id
                    username
                    group
                }
            }`
        })
        .then((res: any) => res.json())
        .then((json: any) => {
            this.user = json.data.user
            this.loading = false
        })
    }
    
    get userId() {
        return this.$route.params.id
    }
    
    get loaded() {
        return !this.loading
    }
}
</script>
<style lang="scss">
</style>