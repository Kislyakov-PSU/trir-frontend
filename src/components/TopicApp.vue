<template>
    <main id="topic-app">
        <div v-if="!loaded">Loading...</div>
        <div v-if="context === 'topics/:id' && loaded">
            <topic-item :topic="currentTopic" :context="context"></topic-item>
        </div>
        <div v-for="(topic, index) of topics" v-else="loaded">
            <topic-item :topic="topic" :context="context"></topic-item>
        </div>
    </main>
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic } from '../models'
import TopicItem from './topic/TopicItem'

@Component({
    components: {
        TopicItem,
    }
})
export default class TopicApp extends Vue {
    @Prop() context!: string
    
    loading: boolean = false
    topics: Topic[] = []
    
    created() {
        this.loadPosts()
    }

    loadPosts() {
        this.loading = true
        fetch("http://localhost:9000", {
            method: "POST",
            body: `{
                topics {
                    id
                    author {
                        id
                        username
                    }
                    posts {
                        id
                        text
                        author {
                            id
                            username
                        }
                    }
                    title
                    text
                }
            }`
        })
        .then((res: any) => res.json())
        .then((json: any) => {
            this.topics = json.data.topics
            this.loading = false
        })
    }
    
    get currentTopic() {
        const topic = this.topics.filter((topic: Topic) => {
            if (topic.id == parseInt(this.$route.params.id)) {
                return true;
            }
            return false;
        })
        return topic[0]
    }
    
    get loaded() {
        return !this.loading
    }
}
</script>
<style lang="scss">
</style>