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

    updateTodoListName(userId, todoListId, todoListName) {

    }

}