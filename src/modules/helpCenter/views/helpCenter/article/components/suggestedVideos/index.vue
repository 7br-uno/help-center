<template>
  <div class="pa-3" v-if="suggestionsVisible">
    <div class="title mb-2 text-left">
      Suggestions de vidéos
    </div>
    <v-row v-if="data.results === null">
      <v-col
        v-for="i in 3"
        :key="i"
        cols="12"
        md="4"
      >
        <v-skeleton-loader v-bind="attrs" type="image" class="mb-3"></v-skeleton-loader>
        <v-skeleton-loader v-bind="attrs" type="heading" class="mb-3"></v-skeleton-loader>
        <v-skeleton-loader v-bind="attrs" type="paragraph"></v-skeleton-loader>
      </v-col>
    </v-row>
    <v-row v-else>
      <v-col
        v-for="item in justThree(data.results)"
        :key="item.id"
        cols="12"
        md="4"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card
              :class="`elevation-${hover ? 5 : 1} ${hover ? 'grey lighten-5' : 0}`"
              class="rounded-lg transition-swing pointer pb-2"
              @click="$router.push(`/support/${item.category.id}/${item.id}`)"
            >
              <v-img :max-height="$vuetify.breakpoint.mdAndUp ? 150 : ''" :src="!!item.image ? item.image : `https://img.youtube.com/vi/${item.video_key}/mqdefault.jpg`">
                <template v-slot:placeholder>
                  <v-row class="fill-height ma-0" align="center" justify="center">
                    <v-progress-circular :size="30" :width="3" indeterminate color="primary"/>
                  </v-row>
                </template>
              </v-img>
              <div
                class="title my-2 px-3 line-height-normal text-left"
                v-text="item.title"
              ></div>
              <div
                class="subtitle-2 font-weight-regular px-3 pb-3 hide-if-big text-left"
                v-text="item.description"
              ></div>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  name: 'suggestedVideos',
  data: () => ({
    suggestionsVisible: true,
    attrs: {
      boilerplate: false,
      loading: true,
      elevation: 0,
    },
    data: {
      child_from: null,
      count: 0,
      items_per_page: 10,
      num_pages: 1,
      results: null
    }
  }),
  mounted() {
    if(this.data.results === null) this.fetchArticles()
  },
  methods: {
    fetchArticles(){
      this.data.results = [
        {
          id: 17,
          title: "Permission Sets",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          image: null,
          video_key: "EvGOlAkLSLw",
          category: {
            id: 3
          }
        },
        {
          id: 14,
          title: "Updating User Information",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          image: null,
          video_key: "pJIKPzZTJXM",
          category: {
            id: 3
          }
        },
        {
          id: 15,
          title: "Visibility Groups",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          image: null,
          video_key: "Z6_J8KxIlmI",
          category: {
            id: 3
          }
        },
        {
          id: 16,
          title: "Who to manage Admin User",
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
          image: null,
          video_key: "awTP7IUY3uo",
          category: {
            id: 3
          }
        }
      ]
    },
    justThree(array){
      let returnArray = []
      for (let i = 0; i < 4; i++) {
        if(
          !!array[i] &&
          array[i].id !== parseInt(this.$route.params.articleId) &&
          returnArray.length < 3
        ){
          returnArray.push(array[i])
        }
      }
      if(returnArray.length === 0) { this.suggestionsVisible = false }
      return returnArray
    }
  },
}
</script>
<style scoped>
.line-height-normal{ line-height: normal; }
.hide-if-big {
  height: 70px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
