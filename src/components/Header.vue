<template>
  <div id="header">

    <b-navbar toggleable="md" type="dark" variant="info">

      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">MyTodos</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse" v-if="userId">

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown text="Settings" right>
            <b-dropdown-header>{{userId}}</b-dropdown-header>
            <b-dropdown-divider></b-dropdown-divider>
            <b-dropdown-item>Profile</b-dropdown-item>
            <b-dropdown-item to="/">Signout</b-dropdown-item>
          </b-nav-item-dropdown>

        </b-navbar-nav>

      </b-collapse>
    </b-navbar>

    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TodoHeader',
  data() {
    return {
      userId: this.$route.params.userId,
      user: null
    }
  }
  /*mounted() {
      axios
        .get('http://localhost:5000/api/users/'+this.userId)
        .then(response => (this.user = response.data))
        .catch(function (error) {
            console.log(error);
        });
  }*/
}
</script>
