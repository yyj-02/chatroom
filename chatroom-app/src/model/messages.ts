import { Timestamp } from "firebase/firestore";

export interface Message {
  id: string;
  originalMessage: string;
  translatedMessage: string;
  timestamp: Timestamp;
  user: {
    id: string;
    name: string;
  };
}

export type Messages = Message[];
