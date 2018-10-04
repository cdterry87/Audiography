import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Artist from './views/Artist.vue'
import Album from './views/Album.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
        path: "/artist/:id",
        component: Artist,
        props: true
    },
    {
        path: "/album/:id",
        component: Album,
        props: true
    }
  ]
})
