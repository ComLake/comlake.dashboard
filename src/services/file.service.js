import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api";

class FileDataService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(API_URL + "/files", formData, {
      headers: authHeader(),
      onUploadProgress,
    });
  }

  getAll() {
    return axios.get(API_URL + "/files", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  update(id, file) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.put(API_URL + `/${id}`, formData, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new FileDataService();
