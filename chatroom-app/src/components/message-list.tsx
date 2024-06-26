import { ScrollArea } from "./ui/scroll-area";
import { Message } from "@/model/messages";
import MessageDisplay from "./message-display";

interface MessageListProps {
  chats: Message[];
  userId: string;
  britishMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  chats,
  userId,
  britishMode,
}) => {
  return (
    <ScrollArea className="h-full w-full rounded-md border bg-white/5 px-2 xl:px-4">
      <div className="py-2 text-center text-neutral-500">
        **Your first message might fail to send as our Hugging Face api is
        warming up, send the message again after 15 seconds.
      </div>
      {chats.map((chat) => {
        const isUser = chat.user.id === userId;
        return (
          <div className="py-2 xl:py-4" key={chat.id}>
            <MessageDisplay
              chat={chat}
              britishMode={britishMode}
              isUser={isUser}
            />
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default MessageList;
