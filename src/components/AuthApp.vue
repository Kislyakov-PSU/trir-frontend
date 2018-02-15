<template lang="pug">
    main#auth-app
        input(type='text', v-model='login', :placeholder='$t("placeholders.auth.login")')
        input(type='password', v-model='password', :placeholder='$t("placeholders.auth.password")')
        button(@click='authorize') Authorize
        button(@click='register') Register
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { User, AuthResponse } from '../models'

@Component
export default class AuthApp extends Vue {
    @Prop() context!: string
    
    login: string = ""
    password: string = ""
    
    created() {
        if (sessionStorage.getItem("jwt") !== null) {
            this.$router.push('topics')
        }
    }
    
    authorize() {
        fetch("http://localhost:9000/auth", {
            method: "POST",
            body: `${this.login};${this.password}`
        })
        .then((res: any) => res.json())
        .then((res: AuthResponse) => {
            if (res.status !== 200) {
                alert(res.error)
            } else {
                sessionStorage.setItem("jwt", res.token || "")
                sessionStorage.setItem("user", JSON.stringify(res.user) || "")
                this.$router.push('topics')
            }
        })
    }
    
    register() {
        fetch("http://localhost:9000/", {
            method: "POST",
            body: JSON.stringify({
                query: `
                    mutation($username: String!, $password: String!) {
                        createUser(
                            username: $username
                            password: $password
                            group: "user"
                        ) {
                            id
                            username
                            group
                        }
                    }`,
                variables: {
                    username: this.login,
                    password: this.password
                }
            })
        })
        .then((res: any) => res.json())
        .then((res: any) => {
            if (res.errors) {
                res.errors.map((err: any) => console.error(err.message))
            } else {
                this.authorize()
            }
        })
    }
}
</script>

<style lang="scss" scoped>
input {
    display: block;
    background: transparent;
    border: none;
    border-bottom: 2px solid #C1C1C1;
    padding: 7px;
    padding-left: 0;
    margin: 10px 0;
    font: 1rem sans-serif;
    transition: all .2s ease;
    
    &:focus {
        border-bottom-color: #488BC9;
    }
}
</style>