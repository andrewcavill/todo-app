<template>
  <div class="user">
    <h1>User</h1>
    <table id="user" v-if="user">
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
    <table id="todolists" v-if="todolists">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Complete?</th>
            <th>Number of Items</th>
            <th>Number of Items Complete</th>
        </tr>
        <tbody>
            <tr v-for="todolist in todolists" :key="todolist.id">
                <td><router-link :to="'/users/'+user.id+'/todolists/'+todolist.id">{{ todolist.id }}</router-link></td>
                <td>{{ todolist.name }}</td>
                <td>{{ todolist.isComplete }}</td>
                <td>{{ todolist.numberOfItems }}</td>
                <td>{{ todolist.numberOfItemsCompleted }}</td>
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
      todolists: null
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
        .then(response => (this.todolists = response.data))
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>