import React from "react";
import { IMessage } from "./ChatInterface";
import { formatTime } from "@/utils/constants";

interface MessageProps {
  message: IMessage;
}

const Message = (props: MessageProps) => {
  const { message } = props;

  return (
    <div>
      {message.role === "assistant" ? (
        <div className="flex justify-start items-start flex-col gap-2">
          <p className="flex rounded-2xl max-w-[90%] w-fit bg-blue-700 text-white p-4">
            {message.content}
          </p>
          <p className="text-slate-800 text-xs">{formatTime(message.time)}</p>
        </div>
      ) : (
        <div className="flex justify-end items-end flex-col gap-2">
          <p className="flex max-w-[90%] w-fit rounded-2xl bg-amber-400 text-black p-4">
            {message.content}
          </p>
          <p className="text-slate-800 text-xs">{formatTime(message.time)}</p>
        </div>
      )}
    </div>
  );
};

export default Message;
