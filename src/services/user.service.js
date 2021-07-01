import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/users";

class UserDataService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post("/api/auth/signup", data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }

  findByUsername(username) {
    return axios.get(API_URL + `/find/${username}`, { headers: authHeader() });
  }

  getCurrentUser(){
    return axios.get(API_URL + "/my-profile", { headers: authHeader() });
  }

}
export default new UserDataService();
