<template lang="pug">
    transition(name='fade', mode='out-in')
        div.topic(v-if='topicExists')
            h2.title {{topic.title}}
            span.author(v-t='"placeholders.by"')
            router-link(:to='authorUrl') {{topic.author.username}}
            div.content {{topic.text}}
            router-link.read-more(v-if='context !== "topics/:id"', :to='topicUrl', v-t='"placeholders.readMore"')
            div.posts(v-if='context === "topics/:id"', v-for='(post, index) in this.topic.posts')
                post-item(:post='post')
            create-post(:topicId='topic.id', v-if='context === "topics/:id"')
            div.admin-panel(v-if='isAdmin')
                button.delete(@click='deleteTopic', v-t='"admin.delete"')
        div.topic(v-else)
            h2.title(v-t='"topic.doesNotExist"')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic, Post } from '../../models'
import PostItem from './PostItem'
import CreatePost from './CreatePost'

@Component({
    components: {
        PostItem,
        CreatePost,
    }
})
export default class TopicItem extends Vue {
    @Prop() loadedTopic!: Topic
    @Prop() context!: string
    
    topic: Topic = this.loadedTopic
    
    deleteTopic() {
        let del = confirm("Delete?")
        if (del) {
        }
    }
    
    get topicUrl(): string {
        return `/topics/${this.topic.id}`
    }
    
    get authorUrl(): string {
        return `/users/${this.topic.author.id}`
    }
    
    get isAdmin(): boolean {
        let sessionItem = sessionStorage.getItem("user")
        if (sessionItem === null) return false
        let user = JSON.parse(sessionItem) || {group: null}
        if (user.group === "admin") return true
        return false
    }
    
    get topicExists(): boolean {
        return !!this.topic.id
    }
}
</script>

<style lang="scss" scoped>
.topic {
    margin: 20px 0;
    
    .title {
        color: #000;
        padding: 0;
        margin: 0;
    }
    
    .author {
        &, & + a {
            color: #606060;
            font-size: 0.9rem;
            font-style: italic;
        }
    }
    
    a {
        color: #488BC9;
        
        &.read-more {
            display: block;
            margin-top: 5px;
        }
    }
}
</style>