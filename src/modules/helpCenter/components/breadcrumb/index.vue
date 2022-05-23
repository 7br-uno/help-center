<script>
export default {
  name: 'categoryDetails',
  data: () => ({
    breadcrumbItems: [
      {
        text: 'Base de connaissances',
        disabled: false,
        to: '/support',
        exact: true,
      },
      {
        text: null,
        disabled: true,
        to: null,
        exact: true,
      }
    ],
  }),
  computed: {
    category(){
      return {
        id: 6,
        title: "Account Settings",
        description: "Set up your personal and company settings.",
        image: "https://kb-cms.pipedriveassets.com/accountsettings.svg"
      }
    },
    article(){
      return {
        title: "How can I add a user?",
      }
    }
  },
  methods:{
    pushArticleDataToBreadcrumb(){
      if(this.$route.params.articleId){
        this.breadcrumbItems[1].disabled = false
        if(this.breadcrumbItems.length === 3){
          this.breadcrumbItems[2].text = this.article.title
          this.breadcrumbItems[2].disabled = true
          this.breadcrumbItems[2].to = null
          this.breadcrumbItems[2].exact = true
        } else {
          this.breadcrumbItems.push({
            text: this.article.title,
            disabled: true,
            to: null,
            exact: true,
          })
        }
      }
    }
  },
  mounted() {
    if(this.category.id) {
      this.breadcrumbItems[1].text = this.category.title
      this.breadcrumbItems[1].to = '/support/' + this.category.id
      this.breadcrumbItems[1].exact = true
    }
    this.pushArticleDataToBreadcrumb()
  },
  watch: {
    'category.title'(){
      this.breadcrumbItems[1].text = this.category.title
      this.breadcrumbItems[1].to = '/support/' + this.category.id
      this.breadcrumbItems[1].exact = true
      this.pushArticleDataToBreadcrumb()
    },
    'article.title'(){
      this.pushArticleDataToBreadcrumb()
    }
  }
}
</script>
<template>
  <div>
    <div class="d-flex">
      <div class="d-flex">
        <v-icon
          size="16"
          class="mr-1"
          color="primary"
          @click="$router.push('/support')"
        >
          mdi-home
        </v-icon>
        <v-breadcrumbs
          small
          class="pa-0"
          :items="breadcrumbItems"
        >
          <template v-slot:divider>
            <v-icon>mdi-chevron-right</v-icon>
          </template>
        </v-breadcrumbs>
      </div>
      <div class="pt-1">
        <v-skeleton-loader
          v-if="!breadcrumbItems[breadcrumbItems.length -1].text"
          width="150"
          :boilerplate="false"
          loading
          elevation="0"
          type="text"
        ></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>
