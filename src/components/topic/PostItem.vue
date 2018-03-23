<template>
    <div class="post">
        <span class="author">
        <router-link :to="authorUrl">{{post.user.username}}</router-link></span>
        <div class="content">{{post.text}}</div>
        <div class="admin-panel" v-if="isAdmin">
            <button class="delete" @click="deletePost" v-t="'admin.delete'"></button>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic, Post } from '../../models'

@Component
export default class PostItem extends Vue {
    @Prop() post!: Post
    
    get authorUrl() {
        return `/users/${this.post.user.id}`
    }
    
    deletePost() {
        let del = confirm("Delete?")
        if (del) {
        }
    }
    
    get isAdmin(): boolean {
        let sessionItem = sessionStorage.getItem("user")
        if (sessionItem === null) return false
        let user = JSON.parse(sessionItem) || {group: null}
        if (user.group === "admin") return true;
        return false;
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