<template>
    <div class="post">
        <span class="author">
        <router-link :to="authorUrl">{{post.author.username}}</router-link></span>
        <div class="content">{{post.text}}</div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic, Post } from '../../models'

@Component
export default class PostItem extends Vue {
    @Prop() post!: Post
    
    get authorUrl() {
        return `/users/${this.post.author.id}`
    }
}
</script>
<style lang="scss">
.post {
    margin: 20px 0;
    margin-left: 8px;
    padding-left: 8px;
    border-left: 2px solid gray;
    
    .title {
        color: #000;
        padding: 0;
        margin: 0;
    }
    
    .author {
        color: #606060;
        font-size: 0.9rem;
        font-style: italic;
        margin: 5px 0;
        display: block;
    }
    
    a {
        display: block;
        margin-top: 5px;
        color: #488BC9;
    }
}
</style>