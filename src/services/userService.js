import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = apiUrl + "/users";

export function getUsers() {
  return http.get(apiEndpoint);
}

export function updateUserProfile(userId, body, file) {
  if (file === null) {
    return http.put(apiEndpoint + "/profile/" + userId, body);
  } else {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    formData.append("profilePicture", file);

    return http.put(apiEndpoint + "/profile/" + userId, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
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
