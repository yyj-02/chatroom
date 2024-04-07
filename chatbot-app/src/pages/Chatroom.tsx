import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Chat, Chats } from "@/model/chats";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Send } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const Chatroom = () => {
  const { id } = useParams();
  const userId = 1;

  const [britishMode, setBritishMode] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Chats>([
    {
      id: 1,
      originalMessage: "Plz la, don't like that leh.",
      translatedMessage: "Please, don't do that.",
      timestamp: "2021-08-01T00:00:00Z",
      user: {
        id: 1,
        name: "User 1",
      },
    },
    {
      id: 2,
      originalMessage: "Ok la bro, no more next time.",
      translatedMessage: "Okay bro, I won't do it again.",
      timestamp: "2021-08-01T00:00:01Z",
      user: {
        id: 2,
        name: "User 2",
      },
    },
  ]);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase();
  };

  const addChat = (chat: Chat) => {
    setChats([...chats, chat]);
  };

  // retrieve chat, redirects to room if chat is not found
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleMessageSend = () => {
    setLoading(true);

    if (!message || message.trim() === "") {
      setMessage("");
      setLoading(false);
      return;
    }

    addChat({
      id: chats.length + 1,
      originalMessage: message,
      translatedMessage: "Translated message",
      timestamp: new Date().toISOString(),
      user: {
        id: userId,
        name: "User 1",
      },
    });

    setLoading(false);
    setMessage("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // enter and no shift enter
    if (event.key === "Enter") {
      event.preventDefault();
      handleMessageSend();
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="mx-auto flex w-full max-w-5xl items-center pl-3 pt-4 xl:mx-0 xl:w-auto xl:flex-grow xl:basis-28 xl:justify-end xl:p-0">
          <Link to="/rooms" className={buttonVariants({ variant: "link" })}>
            <ArrowLeft className="mr-1 inline-block" /> back
          </Link>
        </div>
        <div className="mx-auto w-full max-w-5xl p-8">
          <div className="flex justify-between">
            <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl ">
              Chatroom {id}: Name
            </h1>
            <div className="flex items-center space-x-2">
              <span>🇸🇬</span>
              <Switch
                id="british-mode"
                checked={britishMode}
                onCheckedChange={setBritishMode}
              />
              <Label htmlFor="british-mode">🇬🇧</Label>
            </div>
          </div>
        </div>
        <div className="hidden flex-shrink flex-grow basis-28 xl:block" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl grow flex-col gap-2 px-8 pb-8">
        <ScrollArea className="w-full grow rounded-md border bg-white/5 px-4">
          {chats.map((chat) => {
            const isUser = chat.user.id === userId;
            return (
              <div className="py-4">
                <div
                  className={cn(
                    "flex items-start gap-2",
                    isUser && "flex-row-reverse",
                  )}
                >
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <Avatar>
                          <AvatarFallback>
                            {getInitials(chat.user.name)}
                          </AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <span className="text-xs">{chat.user.name}</span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger>
                        <div
                          className={cn(
                            "min-h-10 max-w-96 shrink rounded-md bg-secondary/70 p-2 leading-7",
                            isUser && "bg-secondary",
                          )}
                        >
                          {britishMode
                            ? chat.translatedMessage
                            : chat.originalMessage}
                        </div>
                      </TooltipTrigger>
                      <TooltipContent
                        className="border-none bg-black/0 px-2 py-0 text-white/50"
                        side="bottom"
                        align={isUser ? "end" : "start"}
                      >
                        <span className="text-xs leading-none">
                          {chat.timestamp}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>
            );
          })}
        </ScrollArea>
        <div className="flex gap-2">
          <Input
            placeholder="Type a message"
            onKeyDown={handleKeyDown}
            value={message}
            onChange={handleOnChange}
            disabled={loading}
          />
          <Button onClick={handleMessageSend} disabled={loading}>
            <Send />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Chatroom;
