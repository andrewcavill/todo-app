<template>
  <div>
    <h1>Todo Item</h1>
    <table class="table" v-if="todoItem">
        <tr>
            <th>ID:</th>
            <td>{{todoItem.id}}</td>
        </tr>
        <tr>
            <th>Name:</th>
            <td>{{todoItem.name}}</td>
        </tr>
        <tr>
            <th>Complete?:</th>
            <td>{{todoItem.isComplete}}</td>
        </tr>
    </table>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'TodoItem',
  data() {
    return {
      userId: this.$route.params.userId,
      todoListId: this.$route.params.todoListId,
      todoItemId: this.$route.params.todoItemId,
      todoItem: null
    }
  },
  mounted() {
      axios
        .get('http://localhost:5000/api/users/'+this.userId+'/todolists/'+this.todoListId+'/todoitems/'+this.todoItemId)
        .then(response => (this.todoItem = response.data))
        .catch(function (error) {
            console.log(error);
        });
    }
}
</script>