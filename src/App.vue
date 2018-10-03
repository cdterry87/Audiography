<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view/>
    </v-content>
    <v-footer app>
      <span>Chase Terry &copy; 2018</span>
    </v-footer>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',
  data () {
    return {
      title: 'Audiography'
    }
  }
}
</script>

<style>
footer {
    text-align: center !important;
}
</style>
