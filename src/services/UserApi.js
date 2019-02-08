import axios from "axios";

export default {

    getUser(userId) {
        return axios
            .get("http://localhost:5000/api/users/" + userId)
            .then(response => { return response.data })
    },

    updateUser(user) {
        return axios
            .put("http://localhost:5000/api/users/" + user.id, user)
            .then(response => { return response.data })
    }

}