import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api";

class UploadFilesService {
  upload(file, onUploadProgress) {
    let formData = new FormData();

    formData.append("file", file);

    return axios.post(API_URL + "/files", formData, {
      headers: authHeader(),
      onUploadProgress,
    });
  }

  getFiles() {
    return axios.get(API_URL + "/files", { headers: authHeader() });
  }
}

export default new UploadFilesService();
