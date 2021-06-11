import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api";

class UserDataService {
  getAll() {
    return axios.get(API_URL + "/users", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/users/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL + "/users", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/users/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/users/${id}`, { headers: authHeader() });
  }

  findByUsername(username) {
    return axios.get(API_URL + `/users/find/${username}`, { headers: authHeader() });
  }

}
export default new UserDataService();
