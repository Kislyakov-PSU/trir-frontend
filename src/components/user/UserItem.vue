<template lang="pug">
    transition(name='fade', mode='out-in')
        div.user(v-if='userExists')
            h1 \#{{user.id}} - {{ user.username }}
            span(v-t='{path: "user.group", args: {group: user.group}}')
            div.admin-panel(v-if='isAdmin')
                button.delete(@click='deleteUser', v-t='"admin.delete"')
        h1(v-else, v-t='"user.doesNotExist"')
    </transition>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { User } from '../../models'

@Component
export default class UserItem extends Vue {
    @Prop() context!: string
    @Prop() user!: User
    
    deleteUser() {
        let del = confirm("Delete?")
        if (del) {
            /* TODO
            <GraphQL{Mutations}>::DeleteUser(<Payload::JSON> {
                token   [jwt.Token = ~sessionStorage.JWT]
                userID  [int = @user.id]
            }): <Payload::JSON> {
                Code    [int = 200 | 500]
            } ~> $router.push('/')
            */
        }
    }
        
    get isAdmin(): boolean {
        let sessionItem = sessionStorage.getItem("user")
        if (sessionItem === null) return false
        let user = JSON.parse(sessionItem) || {group: null}
        if (user.group === "admin") return true;
        return false;
    }
    
    get userExists(): boolean {
        return this.user !== undefined && !!this.user.id
    }
}
</script>

<style lang="scss" scoped>
</style>