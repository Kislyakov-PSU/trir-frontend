<template lang="pug">
    main#topic-app
        div(v-if='!loaded', v-t='"placeholders.loading"')
        div(v-else)
            topic-item(:loadedTopic='topic', :context='context')
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
    topic!: Topic
    
    created() {
        this.loadPost()
    }
    
    get loaded() {
        return !this.loading
    }
    
    get topicId() {
        return this.$route.params.id
    }
    
    @Watch("$route")
    loadPost() {
        this.loading = true
        fetch("http://localhost:9000", {
            method: "POST",
            body: JSON.stringify({
                query: `
                    query ($id: Int!) {
                        topic(id: $id) {
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
                    }`,
                variables: {
                    id: this.topicId
                }
            })
        })
        .then((res: any) => res.json())
        .then((json: any) => {
            this.topic = json.data.topic
            this.loading = false
        })
    }
}
</script>

<style lang="scss" scoped>
</style>