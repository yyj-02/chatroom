import { useState } from "react";
import RoomCard from "@/components/room-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Room } from "@/model/room";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const Rooms = () => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

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
    <div className="flex h-full flex-col">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="mx-auto flex w-full max-w-5xl items-center pl-3 pt-4 xl:mx-0 xl:w-auto xl:flex-grow xl:basis-28 xl:justify-end xl:p-0">
          <Link to="/" className={buttonVariants({ variant: "link" })}>
            <ArrowLeft className="mr-1 inline-block" /> back
          </Link>
        </div>
        <div className="mx-auto w-full max-w-5xl p-8">
          <div className="flex justify-between">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              Rooms
            </h1>
            <Button onClick={createRoom}>+ Create Room</Button>
          </div>
        </div>
        <div className="hidden flex-shrink flex-grow basis-28 xl:block" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl grow flex-col gap-2 px-8 pb-8">
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
