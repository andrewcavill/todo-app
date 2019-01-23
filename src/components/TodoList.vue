<template>
  <div>
    <div v-if="todoList" id="todoListName">
      <span v-show="!isTodoListNameEditable" @click="editTodoListName();">{{todoList.name}}</span>
      <b-form @submit.prevent="submitTodoListName" v-if="isTodoListNameEditable">
        <b-form-input
          ref="todoListNameInput"
          name="todoListName"
          @blur.native="submitTodoListName()"
          v-model="todoList.name"
          class="w-50"
        ></b-form-input>
      </b-form>
    </div>

    <br>

    <b-form @submit.prevent="addTodoItem">
      <b-input-group>
        <b-form-input v-model="newTodoItemName" placeholder="Enter a new item"></b-form-input>
        <b-input-group-append>
          <b-btn type="submit" variant="primary" :disabled="!newTodoItemName">Add Item</b-btn>
        </b-input-group-append>
      </b-input-group>
    </b-form>

    <br>

    <h6>Incomplete Items (new)</h6>
    <table class="table table-sm" v-if="todoItems">
      <transition-group name="todoItemsTransition" tag="tr">
        <tr v-show="!todoItem.isComplete" v-for="todoItem in todoItems" :key="todoItem.id">
          <td class="w-100">
            <b-form-checkbox
              v-model="todoItem.isComplete"
              v-on:change="updateComplete(todoItem.id, true)"
            >{{todoItem.name}}</b-form-checkbox>
          </td>
          <td>
            <a href="#" v-on:click="updateTodoItem(todoItem.id)">
              <v-icon name="edit"></v-icon>
            </a>
          </td>
          <td>
            <a href="#" v-on:click="deleteTodoItem(todoItem.id)">
              <v-icon name="trash-2"></v-icon>
            </a>
          </td>
        </tr>
      </transition-group>
    </table>

    <br>

    <h6>Completed Items</h6>
    <table class="table table-sm" v-if="todoItems">
      <transition-group name="todoItemsTransition" tag="tr">
        <tr v-show="todoItem.isComplete" v-for="todoItem in todoItems" :key="todoItem.id">
          <td class="w-100">
            <b-form-checkbox
              v-model="todoItem.isComplete"
              v-on:change="updateComplete(todoItem.id, false)"
            >{{todoItem.name}}</b-form-checkbox>
          </td>
          <td></td>
        </tr>
      </transition-group>
    </table>
  </div>
</template>

<script>
import TodoListApi from "@/services/TodoListApi";
import TodoItemApi from "@/services/TodoItemApi";

export default {
  name: "TodoList",
  data() {
    return {
      userId: this.$route.params.userId,
      todoListId: this.$route.params.todoListId,
      todoList: null,
      isTodoListNameEditable: false,
      todoItems: null,
      newTodoItemName: null
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
    editTodoListName() {
      this.isTodoListNameEditable = true;
      this.$nextTick(() => this.$refs.todoListNameInput.focus());
    },
    submitTodoListName(evt) {
      this.isTodoListNameEditable = false;
      TodoListApi.updateName(this.userId, this.todoListId, this.todoList.name);
    },
    getTodoItems() {
      TodoItemApi.getTodoItems(this.userId, this.todoListId)
        .then(todoItems => {
          this.todoItems = todoItems.sort(function(a, b) {
            return a.id - b.id;
          });
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    addTodoItem(evt) {
      var newTodoItem = {
        name: this.newTodoItemName,
        isComplete: false
      };
      TodoItemApi.addTodoItem(this.userId, this.todoListId, newTodoItem)
        .then(newTodoItemId => {
          newTodoItem.id = newTodoItemId;
          this.todoItems.push(newTodoItem);
          this.newTodoItemName = null;
        })
        .catch(function(error) {
          console.log(error);
        });
    },
    updateComplete(todoItemId, complete) {
      TodoItemApi.updateComplete(
        this.userId,
        this.todoListId,
        todoItemId,
        complete
      );
    },
    deleteTodoItem(todoItemId) {
      // Remove todo item from the list of todo items
      this.todoItems = this.todoItems.filter(item => item.id != todoItemId);
      // Call the todo items API to delete item
      TodoItemApi.deleteTodoItem(this.userId, this.todoListId, todoItemId);
    }
  },
  mounted() {
    this.getTodoList();
    this.getTodoItems();
  }
};
</script>

<style>
.icon {
  width: 24px;
}

#todoListName {
  font-weight: bold;
  font-size: 14pt;
}

.todoItemsTransition-item {
  display: inline-block;
  margin-right: 10px;
}

.todoItemsTransition-enter-active {
  transition: all 1s;
}

.todoItemsTransition-leave-active {
  transition: all 1s;
}

.todoItemsTransition-enter, .todoItemsTransition-leave-to {
  opacity: 0;
}
</style>
