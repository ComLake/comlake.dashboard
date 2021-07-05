import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/acl/";

class AclDataService {
  getAll() {
    return axios.get(API_URL + "perm", { headers: authHeader() });
  }

  getByFileId(fileId){
    return axios.get(API_URL + `perm/?file=${fileId}`, { headers: authHeader() });
  }

  getByFolderId(folderId){
    return axios.get(API_URL + `perm/?folder=${folderId}`, { headers: authHeader() });
  }
}
export default new AclDataService();
