<template>
  <div>
    <v-text-field
      v-model="search"
      :loading="loading"
      append-icon="mdi-magnify"
      rounded
      clearable
      hide-details
      dense
      outlined
      label="Find a solution"
      type="text"
      >
      <template v-slot:progress>
        <v-progress-linear
          class="loading-search-bar"
          indeterminate
          absolute
          height="2"
        ></v-progress-linear>
      </template>
    </v-text-field>
  </div>
</template>
<script>
export default {
  name: 'searchBar',
  data(){
    return {
      search: ''
    }
  },
  computed: {
    loading(){ return false },
  }
}
</script>
<style scoped>
.loading-search-bar {
  width: 90%;
  margin-left: 5%;
}
</style>
