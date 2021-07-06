import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
          const expirationTime = new Date();
          expirationTime.setDate(expirationTime.getDate() + 1);
          localStorage.setItem("expirationTime", expirationTime);
        }

        return response.data;
      });
  }

  logout() {
    return axios
      .get(API_URL + "logout", { headers: authHeader()} )
      .then(
        localStorage.clear()
      );
  }

  register(data) {
    return axios.post(API_URL + "signup", data);
  }

  getJwtResponse() {
    return JSON.parse(localStorage.getItem('user'));;
  }
}

export default new AuthService();
