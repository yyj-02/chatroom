import { useState } from "react";
import RoomCard from "@/components/room-card";
import { Button } from "@/components/ui/button";
import { Room } from "@/model/room";

const Rooms = () => {
  // Add request signed in

  const [rooms, setRooms] = useState<Room[]>([
    {
      id: 1,
      name: "Room 1",
      description: "Room 1 description",
      link: "/rooms/1",
    },
    {
      id: 2,
      name: "Room 2",
      description: "Room 2 description",
      link: "/rooms/2",
    },
    {
      id: 3,
      name: "Room 3",
      description: "Room 3 description",
      link: "/rooms/3",
    },
  ]);
  // Add request to get rooms
  // Add create room function
  const createRoom = () => {
    console.log("Create room");
    setRooms([
      ...rooms,
      {
        id: rooms.length + 1,
        name: `Room ${rooms.length + 1}`,
        description: `Room ${rooms.length + 1} description`,
        link: `/rooms/${rooms.length + 1}`,
      },
    ]);
  };

  return (
    <div className="w-full max-w-5xl p-8 mx-auto min-h-full">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center">
          Rooms
        </h1>
        <Button onClick={createRoom}>+ Create Room</Button>
      </div>
      <div className="grid grid-cols-1 gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3">
        {rooms.map((room) => (
          <RoomCard key={room.id} {...room} />
        ))}
      </div>
    </div>
  );
};

export default Rooms;
