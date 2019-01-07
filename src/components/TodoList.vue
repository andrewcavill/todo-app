<template>
  <div>
    <h1>Todo List</h1>
    <table class="table" v-if="todoList">
        <tr>
            <th>ID:</th>
            <td>{{todoList.id}}</td>
        </tr>
        <tr>
            <th>Name:</th>
            <td>{{todoList.name}}</td>
        </tr>
        <tr>
            <th>Complete?:</th>
            <td>{{todoList.isComplete}}</td>
        </tr>
        <tr>
            <th>Number of Items:</th>
            <td>{{todoList.numberOfItems}}</td>
        </tr>
        <tr>
            <th>Number of Items Complete:</th>
            <td>{{todoList.numberOfItemsCompleted}}</td>
        </tr>
    </table>
    <table class="table">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Complete?</th>
        </tr>
        <tbody>
            <tr v-for="todoItem in todoItems" :key="todoItem.id">
                <td><router-link :to="'/users/'+userId+'/todolists/'+todoListId+'/todoitems/'+todoItem.id">{{ todoItem.id }}</router-link></td>
                <td>{{ todoItem.name }}</td>
                <td>{{ todoItem.isComplete }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TodoList',
  data() {
    return {
      userId: this.$route.params.userId,
      todoListId: this.$route.params.todoListId,
      todoList: null,
      todoItems: null
    }
  },
  mounted() {
      axios
        .get('http://localhost:5000/api/users/'+this.userId+'/todolists/'+this.todoListId)
        .then(response => (this.todoList = response.data))
        .catch(function (error) {
            console.log(error);
        });
      axios
        .get('http://localhost:5000/api/users/'+this.userId+'/todolists/'+this.todoListId+'/todoitems')
        .then(response => (this.todoItems = response.data.sort(function(a,b) { return a.id - b.id })))
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>