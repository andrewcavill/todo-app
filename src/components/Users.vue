<template>
  <div>
    <h1>Users</h1>
    <table class="table">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td><router-link :to="'/users/'+user.id+'/todolists'">{{ user.id }}</router-link></td>
                <td>{{ user.name }}</td>
                <td>{{ user.email }}</td>
            </tr>
        </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Users',
  data() {
    return {
      users: null
    }
  },
  mounted() {
      axios
        .get('http://localhost:5000/api/users')
        .then(response => (this.users = response.data.sort(function(a,b) { return a.id - b.id })))
        .catch(function (error) {
            console.log(error);
        })
    }
}
</script>