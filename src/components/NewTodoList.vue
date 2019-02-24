<template>
  <b-form @submit.prevent="addTodoList">
    <b-input-group>
      <b-form-input autofocus v-model="newTodoListName" placeholder="Enter name of new list"></b-form-input>
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
      newTodoListName: null
    };
  },
  computed: {
    user() {
      return this.$store.getters.user;
    }
  },
  methods: {
    addTodoList(evt) {
      var newTodoList = {
        name: this.newTodoListName
      };
      TodoListApi.addTodoList(this.user.id, newTodoList).then(
        newTodoListId => this.$router.push({ path: '/users/'+this.user.id+'/todolists/'+newTodoListId })
      );
    }
  }
};
</script>

