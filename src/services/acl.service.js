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

  removeFilePermissionForUser(fileId, userId, perm){
    return axios.delete(API_URL + "file/" + `${fileId}` + "/user/" + `${userId}` + "/perm/" + `${perm}`, { headers: authHeader() });
  }

  removeFilePermissionForGroup(fileId, groupId, perm){
    return axios.delete(API_URL + `file/group/?fileId=${fileId}` + `?groupId=${groupId}` + `?permStr=${perm}`);
  }


}
export default new AclDataService();
