import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/";

class ContentDataService {
  getFirstNode() {
    return axios.get(API_URL + "content", { headers: authHeader() });
  }

  findByName(name) {
    return axios.get(API_URL + "find/name/" + `${name}`, { headers: authHeader() });
  }

  findByTopics(topics) {
    return axios.get(API_URL + "find/topics/" + `${topics}`,
    { headers: authHeader(),
      params: { topics: topics }
     }
  );
  }

  addFileToFolder(folderId, fileId) {
    return axios.put(API_URL + "/folders/" + `${folderId}` + "/files/" + `${fileId}`, null, { headers: authHeader() });
  }

  addSubfolderToFolder(folderId, subfolderId) {
    return axios.put(API_URL + "/folders/" + `${folderId}` + "/subfolders/" + `${subfolderId}`, null, { headers: authHeader() });
  }
}
export default new ContentDataService();
