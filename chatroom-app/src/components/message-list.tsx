import { ScrollArea } from "./ui/scroll-area";
import { Message } from "@/model/messages";
import Message from "./message";

interface MessageListProps {
  chats: Message[];
  userId: number;
  britishMode: boolean;
}

const MessageList: React.FC<MessageListProps> = ({
  chats,
  userId,
  britishMode,
}) => {
  return (
    <ScrollArea className="h-full w-full rounded-md border bg-white/5 px-4">
      {chats.map((chat) => {
        const isUser = chat.user.id === userId;
        return (
          <div className="py-4" key={chat.id}>
            <Message chat={chat} britishMode={britishMode} isUser={isUser} />
          </div>
        );
      })}
    </ScrollArea>
  );
};

export default MessageList;
