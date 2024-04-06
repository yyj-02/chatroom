import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { useParams } from "react-router-dom";

const Chatroom = () => {
  const { id } = useParams();
  const [britishMode, setBritishMode] = useState(true);
  // retrieve chat, redirects to room if chat is not found

  return (
    <div className="w-full max-w-5xl p-8 mx-auto h-full">
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
  );
};

export default Chatroom;
