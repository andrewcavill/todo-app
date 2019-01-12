import axios from "axios";

export default {

    getUser(userId) {
        console.log('using new api service');
        return axios
            .get("http://localhost:5000/api/users/" + userId)
            .then(response => {return response.data})
    }

}