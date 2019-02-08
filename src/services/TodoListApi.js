import axios from "axios";

export default {

    getTodoLists(userId) {
        return axios
            .get(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists")
            .then(response => { return response.data })
    },

    getTodoList(userId, todoListId) {
        return axios
            .get(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId
            )
            .then(response => { return response.data })
    },

    addTodoList(userId, todoList) {
        return axios
            .post(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists",
                todoList)
            .then(response => { return response.data })
    },

    updateName(userId, todoListId, name) {
        return axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/name",
                '"' + name + '"',
                { headers: { "Content-Type": "application/json" } });
    },

    updateComplete(userId, todoListId, complete) {
        return axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/complete",
                complete,
                { headers: { "Content-Type": "application/json" } });
    },

    deleteTodoList(userId, todoListId) {
        return axios
            .delete(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId
            )
    }

}