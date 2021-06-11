import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/";

// class UserService {
//   getPublicContent() {
//     return axios.get(API_URL + "all");
//   }
//
//   getUserBoard() {
//     return axios.get(API_URL + "user", { headers: authHeader() });
//   }
//
//   getAdminBoard() {
//     return axios.get(API_URL + "admin", { headers: authHeader() });
//   }
// }

class UserDataService {
  getAll() {
    return axios.get(API_URL + "/users", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/users/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "/users", { headers: authHeader(), data: data });
  }

  update(id, data) {
    return axios.put(API_URL + `/users/${id}`, { headers: authHeader(), data: data });
  }

  delete(id) {
    return axios.delete(API_URL + `/users/${id}`, { headers: authHeader() });
  }

  findByUsername(username) {
    return axios.get(API_URL + `/users/find/${username}`, { headers: authHeader() });
  }

}
export default new UserDataService();
