<template>
  <div>
    <div v-if="todoList">
      <div class="row">
        <div id="todoListName" class="col-sm-6">
          <span v-show="!isTodoListNameUpdatable" @click="updateTodoListName();">{{todoList.name}}</span>
          <b-form @submit.prevent="submitTodoListName" v-if="isTodoListNameUpdatable">
            <b-form-input
              ref="todoListNameInput"
              name="todoListName"
              @blur.native="submitTodoListName()"
              v-model="todoList.name"
              class="w-50"
            ></b-form-input>
          </b-form>
        </div>
        <div class="col-sm-6">
          <b-button class="float-right" size="sm" variant="primary" v-b-modal.deleteListModal>Delete List</b-button>
        </div>
      </div>
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
        <tr
          v-show="!todoItem.isComplete && !todoItem.isDeleted"
          v-for="todoItem in todoItems"
          :key="todoItem.id"
        >
          <td class="w-100">
            <b-form-checkbox
              v-model="todoItem.isComplete"
              v-on:change="updateIsComplete(todoItem.id, true)"
            ></b-form-checkbox>
            <span>{{todoItem.name}}</span>
          </td>
          <td>
            <a href="#" v-b-modal.updateItemModal v-on:click="pickTodoItemForUpdate(todoItem.id)">
              <v-icon name="edit"></v-icon>
            </a>
          </td>
          <td>
            <a href="#" v-on:click="updateIsDeleted(todoItem.id, true)">
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
        <tr
          v-show="todoItem.isComplete && !todoItem.isDeleted"
          v-for="todoItem in todoItems"
          :key="todoItem.id"
        >
          <td class="w-100">
            <b-form-checkbox
              v-model="todoItem.isComplete"
              v-on:change="updateIsComplete(todoItem.id, false)"
            ></b-form-checkbox>
            <span>{{todoItem.name}}</span>
          </td>
          <td></td>
        </tr>
      </transition-group>
    </table>

    <b-modal id="updateItemModal" size="lg" title="Update Item" @ok="updateTodoItem" centered>
      <b-form-input v-if="todoItemForUpdate" type="text" v-model="todoItemForUpdate.updatedName"></b-form-input>
    </b-modal>

    <b-modal id="deleteListModal" title="Delete List" @ok="deleteTodoList" centered>
      Are you sure you want to delete this list?
    </b-modal>

    <div
      class="col-sm-6"
      v-if="deletedTodoItems.length>0"
      style="position:absolute; bottom:0; right:0"
    >
      <b-alert
        fade
        show="10"
        dismissible
        v-for="deletedTodoItem in deletedTodoItems"
        :key="deletedTodoItem.id"
      >
        <div class="row">
          <div class="col-sm-9">Deleted Item: "{{deletedTodoItem.name}}"</div>
          <div class="col-sm-2">
            <a href="#" v-on:click="updateIsDeleted(deletedTodoItem.id, false)">UNDO</a>
          </div>
          <div class="col-sm-1"></div>
        </div>
      </b-alert>
    </div>
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
      isTodoListNameUpdatable: false,
      todoItems: null,
      newTodoItemName: null,
      todoItemForUpdate: null,
      deletedTodoItems: []
    };
  },
  methods: {
    getTodoList() {
      TodoListApi.getTodoList(this.userId, this.todoListId).then(
        todoList => (this.todoList = todoList)
      );
    },
    updateTodoListName() {
      this.isTodoListNameUpdatable = true;
      this.$nextTick(() => this.$refs.todoListNameInput.focus());
    },
    submitTodoListName(evt) {
      this.isTodoListNameUpdatable = false;
      TodoListApi.updateName(this.userId, this.todoListId, this.todoList.name);
    },
    getTodoItems() {
      TodoItemApi.getTodoItems(this.userId, this.todoListId).then(todoItems => {
        this.todoItems = todoItems.sort(function(a, b) {
          return a.id - b.id;
        });
      });
    },
    addTodoItem(evt) {
      var newTodoItem = {
        name: this.newTodoItemName,
        isComplete: false
      };
      TodoItemApi.addTodoItem(this.userId, this.todoListId, newTodoItem).then(
        newTodoItemId => {
          newTodoItem.id = newTodoItemId;
          this.todoItems.push(newTodoItem);
          this.newTodoItemName = null;
        }
      );
    },
    updateIsComplete(todoItemId, isComplete) {
      TodoItemApi.updateIsComplete(
        this.userId,
        this.todoListId,
        todoItemId,
        isComplete
      );
    },
    updateIsDeleted(todoItemId, isDeleted) {
      // Find to do item to (un)delete
      var todoItemToDelete = this.todoItems.filter(
        item => item.id == todoItemId
      )[0];
      // Set IsDeleted property on todo item
      todoItemToDelete.isDeleted = isDeleted;
      // If deleting item, display an alert for 10 seconds
      if (isDeleted) {
        todoItemToDelete.dismissCountDown = 10;
        this.deletedTodoItems.push(todoItemToDelete);
      }
      // If undoing the deletion then remove the alert
      else {
        this.deletedTodoItems = this.deletedTodoItems.filter(
          item => item.id != todoItemId
        );
      }
      // Call the todo items API to update the IsDeleted property
      TodoItemApi.updateIsDeleted(
        this.userId,
        this.todoListId,
        todoItemToDelete.id,
        isDeleted
      );
    },
    pickTodoItemForUpdate(todoItemId) {
      this.todoItemForUpdate = this.todoItems.filter(
        i => i.id == todoItemId
      )[0];
      this.todoItemForUpdate.updatedName = this.todoItemForUpdate.name;
    },
    updateTodoItem(evt) {
      this.todoItemForUpdate.name = this.todoItemForUpdate.updatedName;
      TodoItemApi.updateName(
        this.userId,
        this.todoListId,
        this.todoItemForUpdate.id,
        this.todoItemForUpdate.name
      );
    },
    deleteTodoList(evt) {
      TodoListApi.deleteTodoList(this.userId, this.todoListId).then( 
        x => this.$router.push({ path: '/users/'+this.userId+'/todolists' })
      );
    }
  },
  mounted() {
    this.getTodoList();
    this.getTodoItems();
  }
};
</script>

<style>
/* Line up checkboxes with item text */
.custom-control-inline {
  display: -webkit-inline-box !important;
}

/* Size of feather icons */
.icon {
  width: 24px;
}

#todoListName {
  font-weight: bold;
  font-size: 14pt;
}

/* The next few styles control the transition when items as (in)completed */
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

.todoItemsTransition-enter,
.todoItemsTransition-leave-to {
  opacity: 0;
}
</style>
