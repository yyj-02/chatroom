import {
  Timestamp,
  addDoc,
  collection,
  doc,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { db } from "./firebase";
import { Messages } from "@/model/messages";

const addMessage = async (
  message: string,
  roomId: string,
  userId: string,
  userName: string,
) => {
  const messageRef = await addDoc(collection(db, "messages"), {
    originalMessage: message,
    translatedMessage: `Translated message: ${message}`,
    user: {
      id: userId,
      name: userName,
    },
    timestamp: Timestamp.now(),
    room: doc(db, "rooms", roomId),
  });

  return messageRef.id;
};

const onMessagesChange = (
  callback: (messages: Messages) => void,
  roomId: string,
) => {
  const roomRef = doc(db, "rooms", roomId);
  const whereChatIsInRoom = where("room", "==", roomRef);
  const messagesQuery = query(
    collection(db, "messages"),
    whereChatIsInRoom,
    orderBy("timestamp"),
  );
  const unsubscribe = onSnapshot(messagesQuery, (querySnapshot) => {
    const messages: Messages = [];
    querySnapshot.forEach((doc) => {
      messages.push({
        id: doc.id,
        originalMessage: doc.data().originalMessage,
        translatedMessage: doc.data().translatedMessage,
        timestamp: doc.data().timestamp,
        user: {
          id: doc.data().user.id,
          name: doc.data().user.name,
        },
      });
    });
    callback(messages);
  });
  return unsubscribe;
};

export { addMessage, onMessagesChange };
