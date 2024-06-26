import MessageInput from "@/components/message-input";
import MessageList from "@/components/message-list";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { auth } from "@/lib/firebase";
import { onMessagesChange, addMessage } from "@/lib/messages";
import { getRoomName } from "@/lib/rooms";
import { Messages } from "@/model/messages";
import { onAuthStateChanged } from "firebase/auth";
import { ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Chatroom = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { roomId } = useParams();
  const [userId, setUserId] = useState("");
  const [roomName, setRoomName] = useState("");
  const [britishMode, setBritishMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Messages>([]);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/");
      } else {
        setUserId(user.uid);
      }
    });

    return () => unsubscribeAuth();
  }, []);

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

    const unsubscribeMessages = onMessagesChange(setMessages, roomId);

    return () => unsubscribeMessages();
  }, [roomId]);

  const sendMessage = async (message: string) => {
    setLoading(true);

    const isMessageEmpty = !message || message.trim() === "";
    if (isMessageEmpty) {
      setLoading(false);
      return;
    }

    if (!userId) {
      navigate("/");
      setLoading(false);
      return;
    }

    try {
      await addMessage(message, roomId ?? "");
    } catch (error: any) {
      console.log(error);
      toast({
        variant: "destructive",
        title: "Try again in 15 seconds.",
        description:
          "Please try sending your message again in 15 seconds as our Hugging Face api is warming up.",
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between pl-1 pr-6 pt-2 xl:mx-0 xl:w-auto xl:flex-grow xl:basis-28 xl:justify-end xl:p-0">
          <Link to="/rooms" className={buttonVariants({ variant: "link" })}>
            <ArrowLeft className="mr-1 inline-block" /> back
          </Link>
          <div className="flex items-center space-x-2 xl:hidden">
            <span>🇸🇬</span>
            <Switch
              id="british-mode"
              checked={britishMode}
              onCheckedChange={setBritishMode}
            />
            <Label htmlFor="british-mode">🇬🇧</Label>
          </div>
        </div>
        <div className="mx-auto w-full max-w-5xl px-6 pb-4 pt-2 xl:p-8">
          <div className="flex justify-between">
            <h1 className="scroll-m-20 text-2xl font-extrabold tracking-tight lg:text-5xl">
              {roomName}
            </h1>
            <div className="hidden items-center space-x-2 xl:flex">
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
      <div className="mx-auto flex w-full max-w-5xl grow flex-col gap-2 px-6 pb-6 xl:px-8 xl:pb-8">
        <div className="w-full grow">
          <MessageList
            chats={messages}
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
