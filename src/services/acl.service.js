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

  grantFilePermissionForUser(fileId, username, perm){
    return axios.put(API_URL + `file/user?fileId=${fileId}` + `&username=${username}` + `&perm=${perm}`, null, { headers: authHeader() });
  }

  grantFilePermissionForGroup(fileId, groupName, perm){
    return axios.put(API_URL + `file/group?fileId=${fileId}` + `&groupName=${groupName}` + `&perm=${perm}`, null, { headers: authHeader() });
  }

  removeFilePermissionForUser(fileId, username, perm){
    return axios.delete(API_URL + `file/user?fileId=${fileId}` + `&username=${username}` + `&perm=${perm}`, { headers: authHeader() });
  }

  removeFilePermissionForGroup(fileId, groupName, perm){
    return axios.delete(API_URL + `file/group?fileId=${fileId}` + `&groupName=${groupName}` + `&perm=${perm}`, { headers: authHeader() });
  }

  grantFolderPermissionForUser(folderId, username, perm){
    return axios.put(API_URL + `folder/user?folderId=${folderId}` + `&username=${username}` + `&perm=${perm}`, null, { headers: authHeader() });
  }

  grantFolderPermissionForGroup(folderId, groupName, perm){
    return axios.put(API_URL + `folder/group?folderId=${folderId}` + `&groupName=${groupName}` + `&perm=${perm}`, null, { headers: authHeader() });
  }

  removeFolderPermissionForUser(folderId, username, perm){
    return axios.delete(API_URL + `folder/user?folderId=${folderId}` + `&username=${username}` + `&perm=${perm}`, { headers: authHeader() });
  }

  removeFolderPermissionForGroup(folderId, groupName, perm){
    return axios.delete(API_URL + `folder/group?folderId=${folderId}` + `&groupName=${groupName}` + `&perm=${perm}`, { headers: authHeader() });
  }
}
export default new AclDataService();
