<template>
  <b-form @submit.prevent="addTodoList">
    <b-input-group>
      <b-form-input v-model="newTodoListName" placeholder="Enter name of new list"></b-form-input>
      <b-input-group-append>
        <b-btn type="submit" variant="primary">Add List</b-btn>
      </b-input-group-append>
    </b-input-group>
  </b-form>
</template>

<script>
import TodoListApi from "@/services/TodoListApi";

export default {
  name: "NewTodoList",
  data() {
    return {
      userId: this.$route.params.userId,
      newTodoListName: null
    };
  },
  methods: {
    addTodoList(evt) {
      var newTodoList = {
        name: this.newTodoListName
      };
      TodoListApi.addTodoList(this.userId, newTodoList).then(
        newTodoListId => this.$router.push({ path: '/users/'+this.userId+'/todolists/'+newTodoListId })
      );
    }
  }
};
</script>

