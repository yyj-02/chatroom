import { useEffect, useState } from "react";
import RoomCard from "@/components/room-card";
import { buttonVariants } from "@/components/ui/button";
import { Room } from "@/model/room";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CreateRoomDialog from "@/components/create-room-dialog";
import { onRoomsChange } from "@/lib/rooms";

const Rooms = () => {
  const navigate = useNavigate();

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      navigate("/");
    }
  });

  const [rooms, setRooms] = useState<Room[]>([]);

  useEffect(() => {
    const unsubscribe = onRoomsChange(setRooms);

    return () => unsubscribe();
  }, []);

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-col xl:flex-row xl:items-stretch">
        <div className="mx-auto flex w-full max-w-5xl items-center pl-1 pt-2 xl:mx-0 xl:w-auto xl:flex-grow xl:basis-28 xl:justify-end xl:p-0">
          <Link to="/" className={buttonVariants({ variant: "link" })}>
            <ArrowLeft className="mr-1 inline-block" /> back
          </Link>
        </div>
        <div className="mx-auto w-full max-w-5xl px-6 pb-4 pt-2 xl:p-8">
          <div className="flex justify-between">
            <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
              Rooms
            </h1>
            <CreateRoomDialog />
          </div>
        </div>
        <div className="hidden flex-shrink flex-grow basis-28 xl:block" />
      </div>
      <div className="mx-auto flex w-full max-w-5xl grow flex-col gap-2 px-6 pb-8 xl:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} {...room} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
