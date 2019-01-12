<template>
  <div>
    <b-card-group deck v-if="todoLists">
      <b-card no-body v-for="todoList in todoLists" :key="todoList.id" style="max-width: 20rem;">
        <b-card-header>
          <b>{{todoList.name}}</b>
        </b-card-header>
        <b-card-body>
          Number of items: {{todoList.numberOfItems}}
          Completed items: {{todoList.numberOfItemsCompleted}}
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
import axios from "axios";

export default {
  name: "User",
  data() {
    return {
      userId: this.$route.params.userId,
      user: null,
      todoLists: null
    };
  },
  mounted() {
    axios
      .get("http://localhost:5000/api/users/" + this.userId)
      .then(response => (this.user = response.data))
      .catch(function(error) {
        console.log(error);
      });
    axios
      .get("http://localhost:5000/api/users/" + this.userId + "/todolists")
      .then(
        response =>
          (this.todoLists = response.data.sort(function(a, b) {
            return a.id - b.id;
          }))
      )
      .catch(function(error) {
        console.log(error);
      });
  }
};
</script>