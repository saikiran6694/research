"use client";

import ChatInterface from "@/components/ChatInterface";
import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [openChat, setOpenChat] = useState<boolean>(false);

  return (
    <>
      {!openChat ? (
        <div
          onClick={() => setOpenChat(true)}
          className="border-2 fixed bottom-3 right-3 bg-black w-16 h-16 z-[100000] rounded-full p-4 object-contain"
        >
          <Image src="vercel.svg" alt="image" width={54} height={54} />
        </div>
      ) : (
        <ChatInterface />
      )}
    </>
  );
}
