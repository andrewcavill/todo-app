<template>
  <div class="users">
    <h1>Users</h1>
    <table id="users">
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
        </tr>
        <tbody>
            <tr v-for="user in users" :key="user.id">
                <td><router-link :to="'/users/'+user.id">{{ user.id }}</router-link></td>
                <td>{{ user.email }}</td>
                <td>{{ user.name }}</td>
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
        .then(response => (this.users = response.data))
        .catch(function (error) {
            console.log(error);
        })
    }
}
</script>