import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Room } from "@/model/room";

const RoomCard: React.FC<Room> = ({ id, name, description, link }) => {
  return (
    <div key={id} className="rounded-lg border bg-white p-4 shadow-md">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight text-primary first:mt-0">
        {name}
      </h2>
      <p className="leading-7 text-background [&:not(:first-child)]:mt-6">
        {description}
      </p>
      <Link to={link}>
        <Button className="mt-4 transition-all ease-in-out hover:-translate-y-1 hover:shadow-md">
          Join Room
        </Button>
      </Link>
    </div>
  );
};

export default RoomCard;
