<template>
  <v-app>
    <nav>
      <router-link to="/support">Help Center</router-link> |
      <router-link to="/admin/support">Help Center Admin</router-link>
    </nav>
    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>
<script>
export default {
  name: 'App',
}
</script>

<style lang="scss" scoped>
nav {
  text-align: center;
  padding-top: 30px;
  padding-bottom: 18px;

  a {
    font-weight: bold;
    color: #2c3e50;
  }
}
</style>
