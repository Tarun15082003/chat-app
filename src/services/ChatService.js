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

export function updateMessages(id, body) {
  return http.put(apiEndpoint + "/messages/" + id, body);
}

export function addNewChat(body) {
  return http.post(apiEndpoint, body);
}
