<template>
  <div>
    <v-skeleton-loader
      v-if="!category.image"
      width="300"
      :boilerplate="false"
      loading
      elevation="0"
      type="list-item-avatar-three-line"
    ></v-skeleton-loader>
    <div v-else class="mt-1 d-flex align-center">
      <v-avatar size="60" width="1" color="grey lighten-5">
        <v-img
          contain
          :src="category.image"
          alt="Category icon"
        ></v-img>
      </v-avatar>
      <div class="pl-2">
        <div class="title text-left" v-text="title ? title : category.title"></div>
        <div class="caption text-left" v-text="title ? category.title : category.description"></div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'faqProfile',
  props: ['title'],
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
