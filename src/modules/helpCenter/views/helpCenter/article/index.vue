<script>
export default {
  name: 'articlePage',
  components: {
    'breadcrumb': () => import('../../../components/breadcrumb'),
    'search-bar': () => import('../../../components/searchBar'),
    'article-content': () => import('./components/article'),
  },
  mounted() {
    if(this.category.id !== parseInt(this.$route.params.categoryId)) this.fetchCategory()
  },
  methods: {
    fetchCategory(){

    }
  },
  computed: {
    category(){
      return {
        title: "Account Settings",
        description: "Set up your personal and company settings.",
        image: "https://kb-cms.pipedriveassets.com/accountsettings.svg"
      }
    }
  }
}
</script>
<template>
  <div class="pt-5 mb-3">
    <v-card color="white" max-width="1200px" class="rounded-lg px-3 mx-auto">
      <v-row>
        <v-col cols="12" md="8" class="px-6 pt-6 pb-md-6">
          <breadcrumb />
        </v-col>
        <v-col cols="12" md="4" class="px-6 pb-6 pt-md-6">
          <search-bar />
        </v-col>
      </v-row>
      <v-row class="mt-md-0">
        <v-col cols="12" class="pt-0 px-6 pb-6">
          <article-content />
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
