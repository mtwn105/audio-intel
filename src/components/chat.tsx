"use client";

import { Intel } from "@/types/intel";
import { SelectTranscript } from "@/lib/schemas";
import { Input } from "@/components/ui/input";
import { chat, Message } from "@/app/actions/chat";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function Chat({ intel }: { intel: Intel | SelectTranscript }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMessage, setUserMessage] = useState<string>("");

  const handleSendMessage = async () => {
    if (userMessage.length === 0) return;

    // Create new array with current message
    const newMessages = [
      ...messages,
      { role: "user" as "user" | "assistant", content: userMessage },
    ];

    // Update messages state
    setMessages(newMessages);

    // Clear input
    setUserMessage("");

    try {
      // Call chat API with new messages
      const assistantMessage = await chat(
        (intel as SelectTranscript).transcriptId! || (intel as Intel).id!,
        newMessages[newMessages.length - 1]
      );

      // Update with response
      setMessages([...newMessages, assistantMessage]);
    } catch (error) {
      console.error(error);
      toast.error("Error sending message");
    }
  };

  return (
    <div className="bg-white rounded-lg p-4 shadow-sm border  w-full">
      <div className="flex flex-col h-[600px]">
        <div className="flex-1 overflow-y-auto mb-4">
          {messages.length > 0 && (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg px-4 py-2 ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {messages.length === 0 && (
            <div className="flex justify-center items-center h-full">
              <p className="text-sm text-muted-foreground">
                Start a conversation by asking questions about the audio.
              </p>
            </div>
          )}
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Type your message..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage();
              }
            }}
          />
          <Button onClick={handleSendMessage}>Send</Button>
        </div>
      </div>
    </div>
  );
}
