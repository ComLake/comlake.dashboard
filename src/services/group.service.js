import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/groups";

class GroupDataService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  create(data) {
    return axios.post(API_URL, data, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }

  addUser(id, username){
    return axios.put(API_URL + `/${id}/users/` + `${username}`, null, { headers: authHeader() });
  }
}
export default new GroupDataService();
