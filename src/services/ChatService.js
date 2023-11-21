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
      { message: "hi", isSender: true, timestamp: "12:34" },
      { message: "hello", isSender: false, timestamp: "12:34" },
      { message: "how are you?", isSender: true, timestamp: "12:34" },
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
      { message: "hi", isSender: true, timestamp: "12:34" },
      { message: "hello", isSender: false, timestamp: "12:34" },
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
      { message: "hi", isSender: true, timestamp: "12:34" },
      { message: "hello", isSender: false, timestamp: "12:34" },
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
      { message: "hi", isSender: true, timestamp: "12:34" },
      { message: "hello", isSender: false, timestamp: "12:34" },
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
      { message: "hi", isSender: true, timestamp: "12:34" },
      { message: "hello", isSender: false, timestamp: "12:34" },
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
      { message: "hi", isSender: true, timestamp: "12:34" },
      { message: "hello", isSender: false, timestamp: "12:34" },
    ],
  },
];

export function getChats() {
  return chats;
}

export function getChat(id) {
  return chats.find((m) => m._id === id);
}

export function getMessages(id) {
  const chat = chats.find((m) => m._id === id);
  return chat.old_messages;
}
