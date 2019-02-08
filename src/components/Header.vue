<template>
  <div id="header">
    <b-navbar toggleable="md" type="dark" variant="primary">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand href="#">
        Todo
        <i>Pro</i>
      </b-navbar-brand>

      <b-collapse is-nav id="nav_collapse" v-if="user">
        <b-navbar-nav>
          <b-nav-item :to="'/users/'+user.id+'/todolists'">My Lists</b-nav-item>
          <b-nav-item v-b-modal.addTodoList v-on:click="showAddTodoListModal()">New List</b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown :text="user.name" right>
            <b-dropdown-item to="/changepassword">Change Password</b-dropdown-item>
            <b-dropdown-item to="/editprofile">Edit Profile</b-dropdown-item>
            <b-dropdown-item to="/logout">Logout</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-modal id="addTodoList" size="lg" title="Add Todo List" @ok="addTodoList" centered>
      <b-form-input type="text" v-model="newTodoListName"></b-form-input>
    </b-modal>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
import TodoListApi from "@/services/TodoListApi";

export default {
  name: "TodoHeader",
  data() {
    return {
      userId: this.$route.params.userId,
      user: null,
      newTodoListName: null
    };
  },
  methods: {
    getUser() {
      UserApi.getUser(this.userId)
        .then(user => (this.user = user))
        .catch(function(error) {
          console.log(error);
        });
    },
    showAddTodoListModal() {
      this.newTodoListName = null;
    },
    addTodoList() {
      TodoListApi.addTodoList(this.userId, this.newTodoListName).then(
        newTodoListId => this.$router.push({ path: '/users/'+this.userId+'/todolists/'+newTodoListId })
      );
    },
    addTodoList() {
      var newTodoList = {
        name: this.newTodoListName
      };
      TodoListApi.addTodoList(this.userId, newTodoList).then(
        newTodoListId => this.$router.push({ path: '/users/'+this.userId+'/todolists/'+newTodoListId })
      );
    }
  },
  mounted() {
    this.getUser();
  },
  watch: {
    $route(to, from) {
      var oldUserId = this.userId;
      this.userId = this.$route.params.userId;
      if (this.userId == null) {
        this.user = null;
      } else {
        if (this.userId != oldUserId) {
          this.getUser();
        }
      }
    }
  }
};
</script>
