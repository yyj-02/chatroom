import {
  collection,
  addDoc,
  query,
  onSnapshot,
  Timestamp,
  orderBy,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { Room } from "@/model/room";

const addRoom = async (name: string, description: string) => {
  const roomRef = await addDoc(collection(db, "rooms"), {
    name,
    description,
    timestamp: Timestamp.now(),
  });

  return roomRef.id;
};

const onRoomsChange = (callback: (rooms: Room[]) => void) => {
  const q = query(collection(db, "rooms"), orderBy("timestamp"));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const rooms: Room[] = [];
    querySnapshot.forEach((doc) => {
      rooms.push({
        id: doc.id,
        name: doc.data().name,
        description: doc.data().description,
      });
    });
    callback(rooms);
  });

  return unsubscribe;
};

const getRoomName = async (roomId: string) => {
  const roomRef = doc(db, "rooms", roomId);
  const roomSnapshot = await getDoc(roomRef);

  if (!roomSnapshot.exists()) {
    throw new Error("Room not found");
  }

  return roomSnapshot.data().name;
};

export { addRoom, onRoomsChange, getRoomName };
