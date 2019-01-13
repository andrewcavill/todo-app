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
    }

}