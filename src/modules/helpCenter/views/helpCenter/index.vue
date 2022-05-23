<script>
export default {
  name: 'help-center-view',
  components: {
    'categories': () => import('../../components/categories'),
    'faq-list': () => import('../../components/faqList'),
    'search-bar': () => import('../../components/searchBar'),
    'email-contact-card': () => import('../../components/banerCards/emailContact')
  },
  methods:{
    search(keywords){ this.$refs.categories.fetchCategories(keywords) }
  }
}
</script>
<template>
  <div class="pt-5 mb-3">
    <v-card color="white" max-width="1200px" class="rounded-lg px-3 mx-auto">
      <v-row>
        <v-col cols="12" md="8" class="pa-6">
          <categories ref="categories"/>
        </v-col>
        <v-col class="px-6 pt-0 pb-6 pa-md-6">
          <v-row>
            <v-col cols="12">
              <search-bar @search="search" :loadingState="'loadingCategoriesGet'" />
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
