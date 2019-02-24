import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Logout from './components/Logout.vue'
import TodoLists from './components/TodoLists.vue'
import TodoList from './components/TodoList.vue'
import NewTodoList from './components/NewTodoList.vue'
import ChangePassword from './components/ChangePassword.vue'
import EditProfile from './components/EditProfile.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    },
    {
      path: '/users/:userId/changepassword',
      name: 'changePassword',
      component: ChangePassword
    },
    {
      path: '/users/:userId/editprofile',
      name: 'editProfile',
      component: EditProfile
    },
    {
      path: '/users/:userId/todolists',
      name: 'todoLists',
      component: TodoLists
    },
    {
      path: '/users/:userId/newtodolist',
      name: 'newTodoList',
      component: NewTodoList
    },
    {
      path: '/users/:userId/todolists/:todoListId',
      name: 'todoList',
      component: TodoList
    }
  ]
})