<template>
    <main id="auth-app">
        <input type="text" v-model="login" placeholder="Login...">
        <input type="password" v-model="password" placeholder="Password..." @keyup.enter="process">
    </main>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { User, AuthResponse } from '../models'

@Component
export default class AuthApp extends Vue {
    @Prop() context!: string
    
    login: string = ""
    password: string = ""
    
    mounted() {
        if (sessionStorage.getItem("jwt") !== null) {
            this.$router.push('topics')
        }
    }
    
    process() {
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
}
</script>
<style lang="scss">
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