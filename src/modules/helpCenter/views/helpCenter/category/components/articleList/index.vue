<template>
  <v-card elevation="0">
    <profile class="mb-4" />
    <div v-if="loading">
      <v-row
        v-for="i in 5"
        :key="i"
      >
        <v-col cols="3">
          <v-skeleton-loader height="88" width="100%" v-bind="attrs" type="image"></v-skeleton-loader>
        </v-col>
        <v-col cols="9">
          <v-skeleton-loader v-bind="attrs" type="heading"></v-skeleton-loader>
          <v-skeleton-loader v-bind="attrs" type="paragraph" class="mt-4"></v-skeleton-loader>
        </v-col>
      </v-row>
    </div>
    <v-row
      v-else
      v-for="item in data.results"
      :key="item.id"
      class="pointer mb-6"
      no-gutters
      @click="$router.push(`/support/${item.category.id}/${item.id}`)"
    >
      <v-col cols="3">
        <v-img
          width="100%"
          :src="!!item.image ? item.image : `https://img.youtube.com/vi/${item.video_key}/mqdefault.jpg`"
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular :size="30" :width="3" indeterminate color="primary"/>
            </v-row>
          </template>
        </v-img>
      </v-col>
      <v-col cols="9" class="pl-6">
        <div
          class="title text-left"
          v-text="item.title"
        ></div>
        <div
          class="subtitle-2 font-weight-regular hideIfBig text-left"
          v-text="item.description"
        ></div>
      </v-col>
    </v-row>
    <v-row
      v-if="!loading && data.results !== null"
      justify="center"
    >
      <v-col cols="8" class="pt-0">
        <v-container class="max-width pt-0">
          <v-pagination
            color="primary"
            v-model="page"
            class="my-4"
            :length="data.num_pages"
          ></v-pagination>
        </v-container>
      </v-col>
    </v-row>
    <empty-search v-if="!!data.results && data.results.length === 0 && searching !== ''" />
    <new-content-soon v-if="!!data.results && data.results.length === 0 && searching === ''" />
  </v-card>
</template>
<script>
export default {
  name: 'categoryList',
  components: {
    'profile': () => import('../../../../../components/profile'),
    'empty-search': () => import('../../../../../components/emptySearch'),
    'new-content-soon': () => import('../../../../../components/newContentSoon')
  },
  props: ['search'],
  data(){
    return {
      page: 1,
      attrs: {
        boilerplate: false,
        loading: true,
        elevation: 0
      },
      data: {
        child_from: null,
        count: 0,
        items_per_page: 10,
        num_pages: 3,
        results: null
      },
      loading: true
    }
  },
  computed: {
    searching(){ return '' }
  },
  mounted() {
    if(this.data.results === null) this.fetchArticles(this.search ? this.search : '')
  },
  methods: {
    fetchArticles(){
      setTimeout( () => {
        this.loading = false
        this.data = {
          child_from: null,
          count: 0,
          items_per_page: 10,
          num_pages: 3,
          results: [
            {
              id: 13,
              title: "How can I add a user?",
              description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
              image: null,
              video_key: "kV__iZuxDGE",
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
            },
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
          ]
        }
      }, 1000);
    }
  },
  watch: {
    page(){
      this.fetchArticles()
    }
  }
}
</script>
<style scoped>
.hideIfBig {
  height: 45px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.pointer{
  cursor: pointer;
}
</style>
