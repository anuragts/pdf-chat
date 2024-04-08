"use client";

import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useChat } from "ai/react";
import AIBubble from "./AIBubble";
import UserBubble from "./UserBubble";

export default function ChatUI() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="w-full rounded-lg border border-gray-200 dark:border-gray-800">
      <div className="flex flex-col min-h-[400px]">
        <div className="p-6 flex flex-col gap-2">
            <div className="flex justify-center font-semibold"> 
            <h1>Chat with PDF</h1>
            </div>
          <div className="text-sm grid gap-1">
            {messages.map((m, index) => {
              if (m.role === "user") {
                return <UserBubble key={index} text={m.content} />
              } else {
                return <AIBubble key={index} text={m.content} />
              }
            })}
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="border-t border-gray-200 dark:border-gray-800 flex-1 fixed bottom-0 w-full">
            <div className="grid items-center gap-4 p-4">
              <div className="w-full">
                <Label htmlFor="message" className="bg-black opacity-40 py-2 px-4">Question</Label>
                <Textarea
                  className="resize-none mt-2"
                  id="message"
                  placeholder="Type your question here."
                  style={{
                    height: "auto",
                  }}
                  value={input}
                  onChange={handleInputChange}
                />
              </div>
              <Button type="submit" className="h-12">
                Send
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
