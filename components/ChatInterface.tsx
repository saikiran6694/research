"use client";

import Image from "next/image";
import React, { useCallback, useState } from "react";
import Message from "./Message";
import { messagesContent } from "@/utils/constants";

export interface IMessage {
  role: string;
  content: string;
  time: Date;
  userMessage?: string;
}

interface IPermissions {
  image: boolean;
  voice: boolean;
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [inputQuery, setInputQuery] = useState<string>("");

  const [permissions, setPermissions] = useState<IPermissions>(() => {
    const storedPermissions = localStorage.getItem("permissions");
    return storedPermissions
      ? JSON.parse(storedPermissions)
      : { image: false, voice: false };
  });

  const handlePermissionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setPermissions((prevPermissions) => {
      const updatedPermissions = {
        ...prevPermissions,
        [name]: value === "yes",
      };

      localStorage.setItem("permissions", JSON.stringify(updatedPermissions));

      return updatedPermissions;
    });
  };

  const handleInputQuerySend = () => {
    setMessages((prev) => [
      ...prev,
      { role: "user", content: inputQuery, time: new Date() },
    ]);

    const getMessage = messagesContent.find(
      (data) => data.userMessage === inputQuery
    );

    setInputQuery("");
    setTimeout(() => {
      const msg = {
        role: "assistant",
        content: "Will help you?",
        time: new Date(),
      };

      if (getMessage !== undefined) {
        setMessages((prev) => [...prev, getMessage]);
      } else {
        setMessages((prev) => [...prev, msg]);
      }
    }, 2000);
  };

  console.log("permissions: ", permissions);

  const Premissions = useCallback(() => {
    return (
      <div className="p-4">
        <p>Allow Image Upload</p>
        <span className="flex gap-2 mr-4 items-center">
          <input
            type="radio"
            name="image"
            value="yes"
            checked={permissions.image}
            onChange={handlePermissionChange}
          />
          <label htmlFor="image-yes">Yes</label>
        </span>
        <span className="flex gap-2 items-center">
          <input
            type="radio"
            name="image"
            value="no"
            checked={!permissions.image}
            onChange={handlePermissionChange}
          />
          <label htmlFor="image-no">No</label>
        </span>

        <span>
          <p>Allow Voice Input</p>
          <span className="flex gap-2 mr-4 items-center">
            <input
              type="radio"
              name="voice"
              value="yes"
              checked={permissions.voice}
              onChange={handlePermissionChange}
            />
            <label htmlFor="voice-yes">Yes</label>
          </span>
          <span className="flex gap-2 items-center">
            <input
              type="radio"
              name="voice"
              value="no"
              checked={!permissions.voice}
              onChange={handlePermissionChange}
            />
            <label htmlFor="voice-no">No</label>
          </span>
        </span>
      </div>
    );
  }, [permissions]);

  return (
    <div className="fixed bottom-3 right-3 shadow-xl rounded-lg border w-[430px] h-[70vh] bg-slate-100">
      {/* header */}
      <span className="flex border-b-2 p-4">
        <p>Chat</p>
      </span>

      <Premissions />

      <div className="h-[75%] flex flex-col gap-4 overflow-y-scroll no-scrollbar p-4">
        {messages.length > 0
          ? messages.map((message, index) => (
              <Message key={`${message.role}_${index}`} message={message} />
            ))
          : null}
      </div>

      {/* Input Data */}
      <div className="absolute bottom-0 flex items-center gap-2 px-4 pb-2 w-full">
        <textarea
          name="chat-input"
          id="input-box"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          className="rounded-full w-full border-2 resize-none outline-none focus:outline-none p-1 text-start"
        ></textarea>
        <span
          onClick={handleInputQuerySend}
          className="p-4 border-2 flex items-center justify-center rounded-full bg-slate-500 hover:bg-black"
        >
          <Image src="vercel.svg" alt="send" width={28} height={28} />
        </span>
      </div>
    </div>
  );
};

export default ChatInterface;
