import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function getUsers() {
  return http.get(apiEndpoint);
}

export function updateUserProfile(userId, body) {
  return http.put(apiEndpoint + "/profile/" + userId, body);
}

export function updateUser(userId, body) {
  return http.put(apiEndpoint + "/" + userId, body);
}

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.email,
    password: user.password,
    name: user.name,
    profileImage: user.profileImage,
  });
}
