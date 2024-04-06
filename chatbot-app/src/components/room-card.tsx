import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { Room } from "@/model/room";

const RoomCard: React.FC<Room> = ({ id, name, description, link }) => {
  return (
    <div key={id} className="p-4 bg-white border rounded-lg shadow-md">
      <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0 text-primary">
        {name}
      </h2>
      <p className="leading-7 [&:not(:first-child)]:mt-6 text-background">
        {description}
      </p>
      <Link to={link}>
        <Button className="mt-4 hover:-translate-y-1 hover:shadow-md transition-all">
          Join Room
        </Button>
      </Link>
    </div>
  );
};

export default RoomCard;
