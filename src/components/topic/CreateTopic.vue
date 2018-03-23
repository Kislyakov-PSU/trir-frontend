<template lang="pug">
    div
        input(v-model='state.title', :placeholder='$t("topic.create.title")')
        textarea(v-model='state.text', :placeholder='$t("topic.create.text")')
        button(@click='create', v-t='"topic.create.button"')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic, Post } from '../../models'

@Component
export default class CreateTopic extends Vue {
    state: any = {
        title: "",
        text: "",
    }
    
    get userId() {
        let user = JSON.parse(sessionStorage.getItem("user")!)
        return user.id
    }
    
    create() {
        fetch("http://localhost:9000/", {
            method: "POST",
            body: JSON.stringify({
                query: `
                    mutation($input: TopicInput!) {
                        createTopic(topic: $input) {
                            id
                            title
                            text
                            user {
                                id
                                username
                            }
                        }
                    }`,
                variables: {
                    input: {
                        title: this.state.title,
                        text: this.state.text,
                        userID: "" + this.userId,
                    },
            }}),
            headers: {
                "Authorization": sessionStorage.getItem("jwt")!
            }
        }).then(res => res.json()).then(res => {
            if (res.errors) {
                res.errors.map((err: any) => console.error(err.message))
            } else {
                (this.$parent as any).topics.push(res.data.createTopic)
                this.state = {title: "", text: ""}
            }
        })
    }
}
</script>

<style lang="scss" scoped>
input, textarea {
    display: block;
    background: none;
    border: none;
    font: 1rem sans-serif;
    border-left: 2px solid gray;
    padding-left: 10px;
    margin-bottom: 10px;
    
    &:focus {
        border-left-color: #488bc9;
    }
}

textarea {
    max-width: 420px;
    width: 100%;
    resize: none;
    height: 210px;
}
</style>
