<template>
  <v-row no-gutters>
    <v-col style="height: 70px" cols="12">
      <v-img
        height="70"
        contain
        :src="data.image"
        alt="category-icon"
        class="mx-auto"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular :size="30" :width="2" indeterminate color="primary"/>
          </v-row>
        </template>
      </v-img>
    </v-col>
    <v-col cols="12" class="text-center">
      <div class="title mt-2" v-text="data.title"></div>
      <div class="subtitle-2 font-weight-regular hideIfBig" v-text="data.description"></div>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: 'categoryCard',
  props: ['data']
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
</style>
