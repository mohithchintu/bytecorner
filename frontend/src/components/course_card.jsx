import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({ title, tutor, seatsLeft, image }) => {
  return (
    <div>
      <Card className="py-4 space-y-2">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
          <Image
            isZoomed
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
          <Link
            to={`/courses/${title}`}
            className="bg-teal-500 rounded-md text-white mt-3 px-2 py-1 text-center"
          >
            Book Now
          </Link>
        </CardBody>
      </Card>
    </div>
  );
};

export default CourseCard;
