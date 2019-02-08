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

    addTodoItem(userId, todoListId, todoItem) {
        return axios
            .post(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems",
                todoItem)
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
                '"' + name + '"',
                { headers: { "Content-Type": "application/json" } });
    },

    updateIsComplete(userId, todoListId, todoItemId, isComplete) {
        axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems/" +
                todoItemId +
                "/iscomplete",
                isComplete,
                { headers: { "Content-Type": "application/json" } });
    },

    updateIsDeleted(userId, todoListId, todoItemId, isDeleted) {
        axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/todoitems/" +
                todoItemId +
                "/isdeleted",
                isDeleted,
                { headers: { "Content-Type": "application/json" } });
    }

}