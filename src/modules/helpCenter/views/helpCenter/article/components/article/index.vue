<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-skeleton-loader v-if="article === null" v-bind="attrs" type="image" class="mt-0"></v-skeleton-loader>
      <div v-else class="video-container">
        <iframe :src="`https://www.youtube.com/embed/${article.video_key}`" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>
    </v-col>
    <v-col cols="12" md="6">
      <profile class="mb-2" :title="'How can I add a user?'"/>
      <v-skeleton-loader v-if="article === null" v-bind="attrs" type="paragraph" class="mt-4"></v-skeleton-loader>
      <div v-else class="text-left" v-text="article.description"></div>
    </v-col>
    <v-col class="pa-0" cols="12">
      <suggested-videos @fetchArticle="fetchArticleById" />
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'articleContent',
  components: {
    'profile': () => import('../../../../../components/profile'),
    'suggested-videos': () => import('../suggestedVideos')
  },
  data(){
    return {
      attrs: {
        boilerplate: false,
        loading: true,
        elevation: 0
      },
      article: null
    }
  },
  mounted() {
    if(!this.article) this.fetchArticleById()
  },
  methods: {
    fetchArticleById(){
      setTimeout( () => {
        this.article = {
          id: 8,
          title: "How can I add a user?",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          image: null,
          video_key: "kV__iZuxDGE",
          category: {
            id: 3,
          }
        }
      }, 1000);
    }
  },
  watch:{
    '$route.params.articleId'(){
      this.fetchArticleById()
    }
  }
}
</script>
<style scoped>
.video-container {
  overflow: hidden;
  position: relative;
  width:100%;
}

.video-container::after {
  padding-top: 56.25%;
  display: block;
  content: '';
}

.video-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
