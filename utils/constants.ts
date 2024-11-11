import { IMessage } from "@/components/ChatInterface";

export const messagesContent: IMessage[] = [
  {
    role: "user",
    content: "Hello, how are you?",
    time: new Date("2024-11-08T09:30:00"),
  },
  {
    role: "assistant",
    userMessage: "Hello, how are you?",
    content: "I'm doing well, thank you! How can I help you today?",
    time: new Date("2024-11-08T09:31:00"),
  },
  {
    role: "user",
    content: "Can you explain the IMessage structure to me?",
    time: new Date("2024-11-08T09:32:00"),
  },
  {
    role: "assistant",
    userMessage: "Can you explain the IMessage structure to me?",
    content:
      "Sure! IMessage has three properties: 'role' (string, indicates who is speaking), 'content' (string, contains the message text), and 'time' (Date, the timestamp of the message).",
    time: new Date("2024-11-08T09:33:00"),
  },
  {
    role: "user",
    content: "Thank you, that makes sense!",
    time: new Date("2024-11-08T09:34:00"),
  },
  {
    role: "user",
    userMessage: "Thank you, that makes sense!",
    content: "Sure, No Problem",
    time: new Date("2024-11-08T09:34:00"),
  },
];

export const formatTime = (date: Date) => {
  if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
    console.error("Invalid date passed to formatTimeForChat:", date);
    return "";
  }

  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  //@ts-ignore
  minutes = minutes < 10 ? "0" + minutes : minutes;
  return hours + ":" + minutes + " " + ampm;
};
