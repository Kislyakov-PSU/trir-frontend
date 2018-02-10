<template>
    <div class="topic">
        <h2 class="title">{{topic.title}}</h2>
        <span class="author">by
        <router-link :to="authorUrl">{{topic.author.username}}</router-link>
        </span>
        <div class="content">{{topic.text}}</div>
        <router-link class="read-more" v-if="context !== 'topics/:id'" :to="topicUrl">
            Read more...
        </router-link>
        <div class="posts" v-if="context === 'topics/:id'" v-for="(post, index) in this.topic.posts">
            <post-item :post="post"></post-item>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic, Post } from '../../models'
import PostItem from './PostItem'

@Component({
    components: {
        PostItem,
    }
})
export default class TopicItem extends Vue {
    @Prop() topic!: Topic
    @Prop() context!: string
    
    get topicUrl() {
        return `/topics/${this.topic.id}`
    }
    
    get authorUrl() {
        return `/users/${this.topic.author.id}`
    }
}
</script>
<style lang="scss">
.topic {
    margin: 20px 0;
    
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
        color: #488BC9;
        
        &.read-more {
            display: block;
            margin-top: 5px;
        }
    }
}
</style>