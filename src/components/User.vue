<template>
  <div>
    <h1>User</h1>
    <table class="table" v-if="user">
        <tr>
            <th>ID:</th>
            <td>{{user.id}}</td>
        </tr>
        <tr>
            <th>Name:</th>
            <td>{{user.name}}</td>
        </tr>
        <tr>
            <th>Email:</th>
            <td>{{user.email}}</td>
        </tr>
    </table>
    <table class="table" id="todolists" v-if="todoLists">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Complete?</th>
            <th>Number of Items</th>
            <th>Number of Items Complete</th>
        </tr>
        <tbody>
            <tr v-for="todoList in todoLists" :key="todoList.id">
                <td><router-link :to="'/users/'+userId+'/todolists/'+todoList.id">{{ todoList.id }}</router-link></td>
                <td>{{ todoList.name }}</td>
                <td>{{ todoList.isComplete }}</td>
                <td>{{ todoList.numberOfItems }}</td>
                <td>{{ todoList.numberOfItemsCompleted }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'User',
  data() {
    return {
      userId: this.$route.params.userId,
      user: null,
      todoLists: null
    }
  },
  mounted() {
      axios
        .get('http://localhost:5000/api/users/'+this.userId)
        .then(response => (this.user = response.data))
        .catch(function (error) {
            console.log(error);
        });
      axios
        .get('http://localhost:5000/api/users/'+this.userId+'/todolists')
        .then(response => (this.todoLists = response.data.sort(function(a,b) { return a.id - b.id })))
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>