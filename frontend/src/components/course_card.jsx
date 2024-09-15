import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import React from "react";

const CourseCard = ({ title, tutor, seatsLeft, image }) => {
  return (
    <Card className="py-4">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image
          alt="Card background"
          className="object-cover rounded-xl"
          src={image}
          width={270}
        />
      </CardHeader>
      <CardBody className="overflow-visible py-2 space-y-2">
        <p className="text-tiny uppercase font-bold">{tutor}</p>
        <small className="text-default-500">{seatsLeft} Seats Left</small>
        <h4 className="font-bold text-large">{title}</h4>
        <button className="bg-teal-500 rounded-md text-white mt-3 px-2 py-1">
          Book Now
        </button>
      </CardBody>
    </Card>
  );
};

export default CourseCard;
