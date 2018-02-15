<template lang="pug">
    div
        textarea(v-model='state.text', :placeholder='$t("topic.create.text")')
        button(@click='create', v-t='"topic.create.button"')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic, Post } from '../../models'

@Component
export default class CreatePost extends Vue {
    @Prop() topicId!: number
    state: any = {
        text: "",
    }
    
    get authorId() {
        let user = JSON.parse(sessionStorage.getItem("user")!)
        return user.id
    }
    
    create() {
        fetch("http://localhost:9000/", {
            method: "POST",
            body: JSON.stringify({
                query: `
                    mutation(
                        $text: String!
                        $author: Int!
                        $topic: Int!
                    ) {
                        createPost(
                            text: $text
                            authorId: $author
                            topicId: $topic
                        ) {
                            id
                            text
                            author {
                                id
                                username
                            }
                        }
                    }`,
                variables: {
                    text: this.state.text,
                    author: this.authorId,
                    topic: this.topicId,
                }
            }),
            headers: {
                "Authorization": sessionStorage.getItem("jwt")!
            }
        }).then(res => res.json()).then(res => {
            if (res.errors) {
                res.errors.map((err: any) => console.error(err.message))
            } else {
                (this.$parent as any).topic.posts.push(res.data.createPost)
                this.state = {text: ""}
            }
        })
    }
}
</script>

<style lang="scss" scoped>
textarea {
    display: block;
    font: 1rem sans-serif;
    resize: none;
    width: 100%;
    max-width: 420px;
    height: 210px;
    border: none;
    border-left: 2px solid gray;
    padding-left: 10px;
    background: none;
}
</style>