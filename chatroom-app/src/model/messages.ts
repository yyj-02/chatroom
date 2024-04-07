export interface Message {
  id: number;
  originalMessage: string;
  translatedMessage: string;
  timestamp: string;
  user: {
    id: number;
    name: string;
  };
}

export type Messages = Message[];
