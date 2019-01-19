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

    updateName(userId, todoListId, name) {
        axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/name",
                '"'+name+'"',
                { headers: { "Content-Type": "application/json" } });
    },

    updateComplete(userId, todoListId, complete) {
        axios
            .put(
                "http://localhost:5000/api/users/" +
                userId +
                "/todolists/" +
                todoListId +
                "/complete",
                completes,
                { headers: { "Content-Type": "application/json" } });
    }

}