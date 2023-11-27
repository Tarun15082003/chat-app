import { apiUrl } from "../config.json";
import http from "./httpService";

const apiEndpoint = apiUrl + "/chats";

let chats = [
  {
    isGroupChat: false,
    users: [
      {
        name: "John Doe",
        email: "john@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7c4dd4",
    chatName: "John Doe",
    old_messages: [
      { message: "hi", isSender: true, timestamp: "20-11-2023 12:34" },
      { message: "hello", isSender: false, timestamp: "20-11-2023 12:34" },
      {
        message: "how are you?",
        isSender: true,
        timestamp: "2023-11-20 12:34",
      },
    ],
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Guest User",
        email: "guest@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468b27c4dd4",
    chatName: "Guest User",
    old_messages: [
      { message: "hi", isSender: true, timestamp: "2023-11-20 12:34" },
      { message: "hello", isSender: false, timestamp: "2023-11-20 12:34" },
    ],
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Anthony",
        email: "anthony@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c2d468bc7c4dd4",
    chatName: "Anthony",
    old_messages: [
      { message: "hi", isSender: true, timestamp: "2023-11-20 12:34" },
      { message: "hello", isSender: false, timestamp: "2023-11-20 12:34" },
    ],
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150716472c78",
    chatName: "Friends",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
    old_messages: [
      { message: "hi", isSender: true, timestamp: "2023-11-20 12:34" },
      { message: "hello", isSender: false, timestamp: "2023-11-20 12:34" },
    ],
  },
  {
    isGroupChat: false,
    users: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
    ],
    _id: "617a077e18c25468bc7cfdd4",
    chatName: "Jane Doe",
    old_messages: [
      { message: "hi", isSender: true, timestamp: "2023-11-20 12:34" },
      { message: "hello", isSender: false, timestamp: "2023-11-20 12:34" },
    ],
  },
  {
    isGroupChat: true,
    users: [
      {
        name: "John Doe",
        email: "jon@example.com",
      },
      {
        name: "Piyush",
        email: "piyush@example.com",
      },
      {
        name: "Guest User",
        email: "guest@example.com",
      },
    ],
    _id: "617a518c4081150016472c78",
    chatName: "Chill Zone",
    groupAdmin: {
      name: "Guest User",
      email: "guest@example.com",
    },
    old_messages: [
      { message: "hi", isSender: true, timestamp: "2023-11-20 12:34" },
      { message: "hello", isSender: false, timestamp: "2023-11-20 12:34" },
    ],
  },
];

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
