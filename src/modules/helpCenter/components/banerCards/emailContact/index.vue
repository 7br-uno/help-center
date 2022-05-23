<template>
  <v-card
    class="mx-auto rounded-lg"
    color="primary"
    dark
  >
    <v-card-title>
      <v-spacer></v-spacer>
      <v-icon
        large
        left
      >
        mdi-help-circle-outline
      </v-icon>
      <span class="title font-weight-light">Need some help?</span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-card-text class="subtitle-2 font-weight-normal text-center">
      If you have already searched the knowledge base but did not find what you need, contact us:
    </v-card-text>
    <v-card-actions class="pb-7">
      <v-btn color="white" class="elevation-0 text-transform-none mx-auto" rounded>
        <v-icon left color="primary">
          mdi-frequently-asked-questions
        </v-icon>
        <span style="color: #7baaed;" class="text-transform-none pr-1">Help</span>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'emailContact'
}
</script>
