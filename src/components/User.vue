<template>
  <div>
    <b-card-group columns v-if="todoLists">
      <b-card no-body v-for="todoList in todoLists" :key="todoList.id" style="max-width: 20rem;">
        <b-card-header>
          <b>{{todoList.name}}</b>
        </b-card-header>
        <b-card-body>
          Number of items: {{todoList.numberOfItems}}<br>
          Completed items: {{todoList.numberOfItemsCompleted}}<br>
          Incomplete items: {{todoList.numberOfItems - todoList.numberOfItemsCompleted}}
        </b-card-body>
        <b-card-footer>
          <router-link :to="'/users/'+userId+'/todolists/'+todoListId">Edit List</router-link>
        </b-card-footer>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
import TodoListApi from "@/services/TodoListApi";

export default {
  name: "User",
  data() {
    return {
      userId: this.$route.params.userId,
      user: null,
      todoLists: null
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
    getTodoLists() {
      TodoListApi.getTodoLists(this.userId)
        .then(todoLists => (this.todoLists = todoLists.sort(function(a, b) {
            return a.id - b.id;
          })))
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getUser();
    this.getTodoLists();
  }
};
</script>