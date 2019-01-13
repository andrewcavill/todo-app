import axios from "axios";

export default {

    getTodoLists(userId) {
        return axios
            .get("http://localhost:5000/api/users/" + userId + "/todolists")
            .then(response => {return response.data})
    }

}