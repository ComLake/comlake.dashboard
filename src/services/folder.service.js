import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/folders";

class FolderDataService {
  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  listContent(id){
    return axios.get(API_URL + "/ls" + `/${id}`, { headers: authHeader() });
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
}
export default new FolderDataService();
