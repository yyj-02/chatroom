import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Chat, Chats } from "@/model/chats";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

const Chatroom = () => {
  const { id } = useParams();
  const userId = 1;

  const [britishMode, setBritishMode] = useState(true);
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

  const addChat = (chat: Chat) => {
    setChats([...chats, chat]);
  };

  // retrieve chat, redirects to room if chat is not found
  // handle send
  const handleMessageSend = (message: string) => {
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
  };

  return (
    <div>
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
      <div className="mx-auto h-full w-full max-w-5xl p-8"></div>
    </div>
  );
};

export default Chatroom;
