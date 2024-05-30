import axios from 'axios'

const FLIGHT_API_BASE_URL = "http://localhost:8090/ARS";

class UserService {
    userProfile(id) {
        return axios.get(FLIGHT_API_BASE_URL + "/userProfile/" + id)
    }

}

export default new UserService()