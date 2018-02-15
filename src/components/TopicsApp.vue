<template lang="pug">
    main#topics-app
        div(v-if='!loaded', v-t='"placeholders.loading"')
        div(v-for='(topic, index) of topics', v-else)
            topic-item(:loadedTopic='topic', :context='context')
        create-topic(v-if='isAdmin')
</template>

<script lang="ts">
import { Vue, Component, Prop, Watch } from 'vue-property-decorator'
import { Topic } from '../models'
import TopicItem from './topic/TopicItem'
import CreateTopic from './topic/CreateTopic'

@Component({
    components: {
        TopicItem,
        CreateTopic,
    }
})
export default class TopicsApp extends Vue {
    @Prop() context!: string
    
    loading: boolean = false
    topics: Topic[] = []
    
    created() {
        this.loadPosts()
    }
    
    get loaded() {
        return !this.loading
    }
    
    get isAdmin() {
        let user = JSON.parse(sessionStorage.getItem("user") || `{"group": null}`)
        return user.group === "admin"
    }
    
    @Watch("$route")
    loadPosts() {
        this.loading = true
        fetch("http://localhost:9000", {
            method: "POST",
            body: JSON.stringify({
                query: `
                query {
                    topics {
                        id
                        author {
                            id
                            username
                        }
                        title
                    }
                }`
            })
        })
        .then((res: any) => res.json())
        .then((json: any) => {
            this.topics = json.data.topics
            this.loading = false
        })
    }
}
</script>

<style lang="scss" scoped>
</style>