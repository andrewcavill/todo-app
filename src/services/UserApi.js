import axios from "axios";

export default {

    getUser(userId) {
        return axios
            .get("http://localhost:5000/api/users/" + userId)
            .then(response => {return response.data})
    }

}