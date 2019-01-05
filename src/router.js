import Vue from 'vue'
import Router from 'vue-router'
import Skills from './components/Skills.vue'
import About from './components/About.vue'
import Users from './components/Users.vue'
import User from './components/User.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'skills',
      component: Skills
    },
    {
      path: '/about/:name',
      name: 'about',
      component: About
    },
    {
      path: '/users',
      name: 'users',
      component: Users
    },
    {
      path: '/users/:userId',
      name: 'user',
      component: User
    }
  ]
})