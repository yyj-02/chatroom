export interface Chat {
  id: number;
  originalMessage: string;
  translatedMessage: string;
  timestamp: string;
  user: {
    id: number;
    name: string;
  };
}

export type Chats = Chat[];
