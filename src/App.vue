<template>
  <v-app>
    <v-app-bar
      app
      color="#007AFF"
      dark
      flat
    >
      <div style="min-width: 1170px; margin: 0 auto;">
        <div>
          <v-toolbar-title class="di_title">digital inside</v-toolbar-title>
        </div>
        <v-spacer></v-spacer>
      </div>
    </v-app-bar>

    <div class="main_content">
      <router-view/>
    </div>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data: () => ({
    //
  }),
};
</script>

<style lang="scss" scoped>
.di_title{
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 36px;
  line-height: 42px;
  margin-top: auto;
  margin-bottom: auto;
}

.main_content{
  max-width: 1170px;
  margin: 0 auto;
  margin-top: 64px;
}
</style>
