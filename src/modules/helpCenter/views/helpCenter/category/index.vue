<script>
export default {
  name: 'help-center-view-category',
  components: {
    'category-list': () => import('./components/articleList'),
    'breadcrumb': () => import('../../../components/breadcrumb'),
    'faq-list': () => import('../../../components/faqList'),
    'search-bar': () => import('../../../components/searchBar'),
    'email-contact-card': () => import('../../../components/banerCards/emailContact')
  },
  mounted() {
    if(this.category.id !== parseInt(this.$route.params.categoryId)) this.fetchCategory()
  },
  methods: {
    fetchCategory(){},
    search(keywords){ this.$refs.categoryList.fetchArticles(keywords) }
  },
  computed: {
    category(){
      return {
        id: 6,
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
        <v-col cols="12" md="8" class="px-6 pb-0 pt-6 pa-md-6">
          <breadcrumb />
          <category-list ref="categoryList" :search="$route.query.search"/>
        </v-col>
        <v-col class="px-6 pt-4 pb-6 pa-md-6">
          <v-row>
            <v-col cols="12">
              <search-bar @search="search" :loadingState="'loadingArticlesGet'" />
            </v-col>
            <v-col cols="12">
              <faq-list :orderBy="'popularity'"/>
            </v-col>
            <v-col cols="12">
              <faq-list :orderBy="'last'"/>
            </v-col>
            <v-col cols="12">
              <email-contact-card />
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
