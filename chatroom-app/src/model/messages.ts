export interface Message {
  id: string;
  originalMessage: string;
  translatedMessage: string;
  timestamp: string;
  user: {
    id: string;
    name: string;
  };
}

export type Messages = Message[];
