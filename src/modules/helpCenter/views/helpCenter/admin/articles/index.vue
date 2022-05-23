<script>
export default {
  name: 'FAQ_AdminArticles',
  components: {
    'actions-bar': () => import('../../../../components/actionsBar'),
    'faq-list': () => import('./components/faqList'),
    'article-dialog': () => import('./components/articleDialog')
  },
  methods: {
    action(action, item){
      switch(action) {
        case 'openDialogNewArticle':
          this.$refs.articleDialog.show = true
          this.$refs.articleDialog.dialogFunction = 'CREATE'
          break;
        case 'openDialogSeeArticle':
          this.$refs.articleDialog.show = true
          this.$refs.articleDialog.dialogFunction = 'READ'
          this.$refs.articleDialog.fillFields(item)
          break;
        case 'openDialogWatchVideo':
          this.$refs.articleDialog.show = true
          this.$refs.articleDialog.dialogFunction = 'WATCH_VIDEO'
          this.$refs.articleDialog.videoId = item
          break;
        case 'openDialogEditArticle':
          this.$refs.articleDialog.show = true
          this.$refs.articleDialog.dialogFunction = 'UPDATE'
          this.$refs.articleDialog.fillFields(item)
          break;
        case 'refreshArticlesList':
          this.$refs.articleFaqList.fetchArticles()
          break;
        case 'search':
          this.$refs.articleFaqList.fetchArticles(item)
          break;
        case 'filterByCategory':
          this.$refs.articleFaqList.fetchArticles('', item)
          break;
        case 'removeArticle':
          alert('deleted')
          break;
        default:
          // code block
      }
    }
  }
}
</script>
<template>
  <div class="pt-5 mb-3">
    <v-card color="white" max-width="1200px" class="rounded-lg px-3 mx-auto">
      <actions-bar @action="action" />
      <faq-list ref="articleFaqList" @action="action" />
      <article-dialog ref="articleDialog" @action="action" />
    </v-card>
  </div>
</template>
