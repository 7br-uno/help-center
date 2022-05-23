<template>
  <v-card
    class="pa-5 rounded-lg"
    elevation="0"
    color="grey lighten-5"
  >
    <div class="title mb-1 text-left" v-text="setup.title"></div>
    <v-skeleton-loader v-if="data === null" v-bind="attrs"></v-skeleton-loader>
    <div
      v-else
      class="subtitle-2 font-weight-regular link mt-1 text-left"
      v-for="item in data"
      :key="item.id"
      v-text="item.title"
      @click="$router.push(`/support/${item.category.id}/${item.id}`)"
    ></div>
  </v-card>
</template>
<script>
export default {
  name: 'faqList',
  props: ['orderBy'],
  data(){
    return {
      data: null,
      attrs: {
        boilerplate: false,
        loading: true,
        elevation: 0,
        type: 'paragraph, paragraph'
      }
    }
  },
  computed: {
    setup(){
      switch(this.orderBy) {
        case 'popularity':
          return {
            state: 'popularity',
            orderBy: '-views',
            title: 'Popular questions'
          }
        case 'last':
          return {
            state: 'last',
            orderBy: '-create_date',
            title: 'Last added questions'
          }
        default:
          return {
            state: 'popularity',
            orderBy: '-views',
            title: 'Questions fréquentes'
          }
      }
    },
  },
  mounted() {
    if(this.data === null){
      setTimeout( () => {
        let faqList = [
          {
            id: 19,
            title: "How can I add a user?",
            category: {id: 1}
          },
          {
            id: 20,
            title: "Who to manage Admin User",
            category: {id: 1}
          },
          {
            id: 21,
            title: "Visibility Groups",
            category: {id: 1}
          },
          {
            id: 22,
            title: "Updating User Information",
            category: {id: 1}
          },
          {
            id: 23,
            title: "Permission Sets",
            category: {id: 1}
          }
        ]
        this.data = this.setup.state === 'last' ? faqList : faqList.reverse();
      }, 1000);
    }
  }
}
</script>
<style scoped>
.link:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
