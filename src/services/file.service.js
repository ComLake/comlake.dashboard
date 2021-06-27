import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/";

class FileDataService {
  upload(file, source, topics, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("source", source);
    formData.append("topics", topics);

    return axios.post(API_URL + "files", formData, {
      headers: authHeader(),
      onUploadProgress,
    });
  }

  getAll() {
    return axios.get(API_URL + "files", { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `${id}`, { headers: authHeader() });
  }
}

export default new FileDataService();
