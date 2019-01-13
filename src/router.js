import Vue from 'vue'
import Router from 'vue-router'
import Users from './components/Users.vue'
import User from './components/User.vue'
import TodoList from './components/TodoList.vue'
import TodoItem from './components/TodoItem.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'users',
      component: Users
    },
    {
      path: '/logout',
      name: 'logout',
      redirect: '/'
    },
    {
      path: '/users/:userId',
      name: 'user',
      component: User
    },
    {
      path: '/users/:userId/todolists/:todoListId',
      name: 'todoList',
      component: TodoList
    },
    {
      path: '/users/:userId/todolists/:todoListId/todoItems/:todoItemId',
      name: 'todoItem',
      component: TodoItem
    }
  ]
})