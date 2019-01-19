import axios from "axios";

export default {

    getTodoItems(userId, todoListId) {
        return axios
            .get(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems")
            .then(response => { return response.data })
    },

    addTodoItem(userId, todoListId, todoItemName) {
        return axios
            .post(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems",
                todoItemName)
            .then(response => { return response.data })
    },

    updateName(userId, todoListId, todoItemId, name) {
        axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems/" +
                todoItemId +
                "/name",
                name,
                {headers: {"Content-Type": "application/json"}});
    },

    updateComplete(userId, todoListId, todoItemId, complete) {
        axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems/" +
                todoItemId +
                "/complete",
                complete,
                {headers: {"Content-Type": "application/json"}});
    }

}