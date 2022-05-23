<script>
export default {
  name: 'FAQ_AdminCategories',
  components: {
    'actions-bar': () => import('../../../../components/actionsBar'),
    'category-list': () => import('./components/categoryList'),
    'category-dialog': () => import('./components/categoryDialog')
  },
  methods: {
    action(action, item){
      switch(action) {
        case 'openDialogNewCategory':
          this.$refs.categoryDialog.show = true
          this.$refs.categoryDialog.dialogFunction = 'CREATE'
          break;
        case 'openDialogSeeCategory':
          this.$refs.categoryDialog.show = true
          this.$refs.categoryDialog.dialogFunction = 'READ'
          this.$refs.categoryDialog.fillFields(item)
          break;
        case 'openDialogEditCategory':
          this.$refs.categoryDialog.show = true
          this.$refs.categoryDialog.dialogFunction = 'UPDATE'
          this.$refs.categoryDialog.fillFields(item)
          break;
        case 'refreshCategoriesList':
          this.$refs.categoryList.fetchCategories()
          break;
        case 'search':
          this.$refs.categoryList.fetchCategories(item)
          break;
        case 'removeCategory':
          alert('deleted')
          break;
      }
    }
  }
}
</script>
<template>
  <div class="pt-5 mb-3">
    <v-card color="white" max-width="1200px" class="rounded-lg px-3 mx-auto">
      <actions-bar @action="action" />
      <category-list ref="categoryList" @action="action" />
      <category-dialog ref="categoryDialog" @action="action" />
    </v-card>
  </div>
</template>
