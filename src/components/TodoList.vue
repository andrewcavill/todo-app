<template>
  <div>
    <h3 v-if="todoList">{{todoList.name}}</h3>

    <br>

    <b-input-group prepend="Add a new item">
      <b-form-input></b-form-input>
      <b-input-group-append>
        <b-btn variant="info">Submit</b-btn>
      </b-input-group-append>
    </b-input-group>

    <br>

    <h6>Incomplete Items</h6>
    <b-input-group v-for="todoItem in incompleteTodoItems" :key="todoItem.id" class="todoItem">
      <b-form-input v-model="todoItem.name">{{ todoItem.name }}</b-form-input>
      <b-input-group-append>
        <b-btn variant="info">Complete</b-btn>
      </b-input-group-append>
    </b-input-group>

    <br>

    <h6>Completed Items</h6>
    <b-list-group v-if="completedTodoItems">
      <b-list-group-item
        v-for="todoItem in completedTodoItems"
        :key="todoItem.id"
      >{{ todoItem.name }}</b-list-group-item>
    </b-list-group>

  </div>
</template>

<script>
import axios from "axios";
import TodoListApi from "@/services/TodoListApi";
import TodoItemApi from "@/services/TodoItemApi";

export default {
  name: "TodoList",
  data() {
    return {
      userId: this.$route.params.userId,
      todoListId: this.$route.params.todoListId,
      todoList: null,
      todoItems: null,
      incompleteTodoItems: null,
      completedTodoItems: null
    };
  },
  methods: {
    getTodoList() {
      TodoListApi.getTodoList(this.userId, this.todoListId)
        .then(todoList => (this.todoList = todoList))
        .catch(function(error) {
          console.log(error);
        });
    },
    getTodoItems() {
      TodoItemApi.getTodoItems(this.userId, this.todoListId)
        .then(todoItems => {
          this.incompleteTodoItems = todoItems
            .filter(function(a) {
              return !a.isComplete;
            })
            .sort(function(a, b) {
              return a.id - b.id;
            });
          this.completedTodoItems = todoItems
            .filter(function(a) {
              return a.isComplete;
            })
            .sort(function(a, b) {
              return a.id - b.id;
            });
        })
        .catch(function(error) {
          console.log(error);
        });
    }
  },
  mounted() {
    this.getTodoList();
    this.getTodoItems();
  }
};
</script>

<style>
.todoItem {
    margin-bottom: 10px;
}
</style>
