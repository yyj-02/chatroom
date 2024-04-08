import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "./ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Message } from "@/model/messages";
import { Timestamp } from "firebase/firestore";

interface MessageProps {
  chat: Message;
  britishMode: boolean;
  isUser: boolean;
}

const MessageDisplay: React.FC<MessageProps> = ({
  chat,
  britishMode,
  isUser,
}) => {
  const getInitials = (name: string) => {
    if (!name) return "";
    return name
      .split(" ")
      .slice(0, 2)
      .map((s) => s[0])
      .join("")
      .toUpperCase();
  };

  const formatTimestamp = (timestamp: Timestamp) => {
    const date = timestamp.toDate();
    const isToday = new Date().toDateString() === date.toDateString();

    return date.toLocaleString("en-US", {
      month: isToday ? undefined : "short",
      day: isToday ? undefined : "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className={cn("flex items-start gap-2", isUser && "flex-row-reverse")}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Avatar>
              <AvatarFallback>{getInitials(chat.user.name)}</AvatarFallback>
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
              {britishMode ? chat.translatedMessage : chat.originalMessage}
            </div>
          </TooltipTrigger>
          <TooltipContent
            className="border-none bg-black/0 px-2 py-0 text-white/50"
            side="bottom"
            align={isUser ? "end" : "start"}
          >
            <span className="text-xs leading-none">
              {formatTimestamp(chat.timestamp)}
            </span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

export default MessageDisplay;
