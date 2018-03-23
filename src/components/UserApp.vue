<template lang="pug">
    main#user-app
        div(v-if='!loaded', v-t='"placeholders.loading"')
        div(v-else)
            user-item(:user='user', :context='context')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { User } from '../models'
import UserItem from './user/UserItem.vue'

@Component({
    components: {
        UserItem,
    }
})
export default class UserApp extends Vue {
    @Prop() context!: string
    
    loading: boolean = false
    user!: User
    
    created() {
        this.loadUser()
    }
    
    get userId() {
        return this.$route.params.id
    }
    
    get loaded() {
        return !this.loading
    }
    
    deleteUser() {
        let del = confirm("Delete?")
        if (del) {
        }
    }
    
    @Watch("$route")
    loadUser() {
        this.loading = true
        fetch("http://localhost:9000", {
            method: "POST",
            body: JSON.stringify({
                query: `
                    query($id: ID!) {
                        user(id: $id) {
                            id
                            username
                            group
                        }
                    }`,
                variables: {
                    id: this.userId,
                }
            })
        })
        .then((res: any) => res.json())
        .then((json: any) => {
            this.user = json.data.user
            this.loading = false
        })
    }
}
</script>

<style lang="scss" scoped>
</style>
