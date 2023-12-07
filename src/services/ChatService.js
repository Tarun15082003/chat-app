import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/chats";

export function getChats(userId) {
  return http.get(apiEndpoint + "/" + userId);
}

export function getChat(id) {
  return http.get(apiEndpoint + "/messages/" + id);
}

export function getMessages(id) {
  return http.get(apiEndpoint + "/messages/" + id);
}

export function updateMessages(id, body, file) {
  if (file === null) {
    return http.put(apiEndpoint + "/messages/" + id, body);
  } else {
    const formData = new FormData();
    Object.keys(body).forEach((key) => {
      formData.append(key, body[key]);
    });

    formData.append("mediamessage", file);

    return http.put(apiEndpoint + "/messages/" + id, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export function addNewChat(body) {
  return http.post(apiEndpoint, body);
}
