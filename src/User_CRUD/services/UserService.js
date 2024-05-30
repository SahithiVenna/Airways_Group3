import axios from 'axios'

const USER_API_BASE_URL = "/api/USER_CRUD";

class UserService
{
    getAllUsers()
    {
        return axios.get(USER_API_BASE_URL + "/getAllUsers")
    }

    createUser(user)
    {
        var URL = USER_API_BASE_URL + "/insertUserData";
        return axios.post(URL, user);
    }

    GetUserDetailsById(id)
    {
        var URL = USER_API_BASE_URL + "/GetUserDetailsById?id=" + id;
        return axios.get(URL);
    }

    updateUser(id, user)
    {
        var URL = USER_API_BASE_URL + "/updateUser/" + id;
        return axios.put(URL, user);
    }

    deleteUser(id)
    {
        var URL = USER_API_BASE_URL + "/deleteUserByID?id=" + id;
        return axios.delete(URL);
    }

    updateUserDetails(data)
    {
        var URL = USER_API_BASE_URL + "/updateUserDetails";
        return axios.put(URL, data);
    }

    InsertUserDetails(data)
    {
        var URL = USER_API_BASE_URL + "/InsertUserDetails";
        return axios.post(URL, data);
    }
}
export default new UserService()