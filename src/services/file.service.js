import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/files";

class FileDataService {
  upload(file, source, topics, language) {
    let formData = new FormData();

    formData.append("file", file);
    formData.append("source", source);
    formData.append("topics", topics);
    formData.append("language", language);

    return axios.post(API_URL, formData, {
      headers: authHeader()
    });
  }

  getAll() {
    return axios.get(API_URL, { headers: authHeader() });
  }

  get(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader() });
  }

  update(id, data) {
    return axios.put(API_URL + `/${id}`, data, { headers: authHeader() });
  }

  delete(id) {
    return axios.delete(API_URL + `/${id}`, { headers: authHeader() });
  }
}

export default new FileDataService();
