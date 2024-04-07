import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Send } from "lucide-react";

interface MessageInputProps {
  sendMessage: (message: string) => void;
  disabled: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({
  sendMessage,
  disabled,
}) => {
  const [message, setMessage] = useState("");

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleMessageSend();
    }
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.currentTarget.value);
  };

  const handleMessageSend = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex gap-2">
      <Input
        placeholder="Type a message"
        onKeyDown={handleKeyDown}
        value={message}
        onChange={handleOnChange}
        disabled={disabled}
      />
      <Button onClick={handleMessageSend} disabled={disabled}>
        <Send />
      </Button>
    </div>
  );
};

export default MessageInput;
