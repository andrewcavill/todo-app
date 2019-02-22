<template>
  <div id="header">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand>
        Todo
        <i>Pro</i>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse" v-if="$store.getters.user">
        <b-navbar-nav>
          <b-nav-item :to="'/users/'+$store.getters.user.id+'/todolists'">My Lists</b-nav-item>
          <b-nav-item :to="'/users/'+$store.getters.user.id+'/newtodolist'">New List</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto"  v-if="$store.getters.user">
          <b-nav-item-dropdown :text="$store.getters.user.name" right>
            <b-dropdown-item :to="'/users/'+$store.getters.user.id+'/changepassword'">Change Password</b-dropdown-item>
            <b-dropdown-item :to="'/users/'+$store.getters.user.id+'/editprofile'">Edit Profile</b-dropdown-item>
            <b-dropdown-item to="/logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  name: "TodoHeader"
};
</script>
