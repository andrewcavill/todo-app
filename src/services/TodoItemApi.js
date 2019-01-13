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
    }

}