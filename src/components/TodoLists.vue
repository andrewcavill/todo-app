<template>
  <div>
    <b-card-group columns v-if="todoLists">
      <router-link :to="'/users/'+userId+'/todolists/'+todoList.id" v-for="todoList in todoLists">
        <b-card
          no-body
          :key="todoList.id"
          border-variant="primary"
          align="center"
        >
          <b-card-header header-bg-variant="primary" header-text-variant="white">
            <b>{{todoList.name}}</b>
          </b-card-header>
          <b-card-body>
            Number of items: {{todoList.numberOfItems}}
            <br>
            Completed items: {{todoList.numberOfItemsCompleted}}
            <br>
            Incomplete items: {{todoList.numberOfItems - todoList.numberOfItemsCompleted}}
          </b-card-body>
        </b-card>
      </router-link>
    </b-card-group>
  </div>
</template>

<script>
import UserApi from "@/services/UserApi";
import TodoListApi from "@/services/TodoListApi";

export default {
  name: "TodoLists",
  data() {
    return {
      userId: this.$route.params.userId,
      user: null,
      todoLists: null,
      colour: "primary"
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
        .then(
          todoLists =>
            (this.todoLists = todoLists.sort(function(a, b) {
              return a.id - b.id;
            }))
        )
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