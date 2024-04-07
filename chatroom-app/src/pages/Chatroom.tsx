import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Message, Messages } from "@/model/messages";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import MessageInput from "@/components/message-input";
import MessageList from "@/components/message-list";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { getRoomName } from "@/lib/rooms";
import { useToast } from "@/components/ui/use-toast";

const Chatroom = () => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const { toast } = useToast();

  const { roomId } = useParams();

  const [roomName, setRoomName] = useState("");
  useEffect(() => {
    if (roomId === undefined) {
      toast({
        variant: "destructive",
        title: "Oh no! Something went wrong.",
        description: "Room not found.",
      });
      navigate("/rooms");
      return;
    }

    getRoomName(roomId)
      .then(setRoomName)
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Oh no! Something went wrong.",
          description: "Room not found.",
        });
        navigate("/rooms");
      });
  }, []);

  const userId = 1;

  const [britishMode, setBritishMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chats, setChats] = useState<Messages>([
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

  const addChat = (chat: Message) => {
    setChats([...chats, chat]);
  };

  // retrieve chat, redirects to room if chat is not found
  const sendMessage = (message: string) => {
    setLoading(true);

    if (!message || message.trim() === "") {
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
              {roomName}
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
        <div className="w-full grow">
          <MessageList
            chats={chats}
            userId={userId}
            britishMode={britishMode}
          />
        </div>

        <MessageInput sendMessage={sendMessage} disabled={loading} />
      </div>
    </div>
  );
};

export default Chatroom;
