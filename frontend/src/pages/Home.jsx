import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar";
import features from "../assets/features.png";
import feedback from "../assets/feedback3.png";

const PilotPage = () => {
  return (
    <div className="relative min-h-screen bg-cover bg-center bg-white">
      {/* Container for text */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center">
        {/* Styled text with no space between */}
        <div className="flex">
          <h1 className="text-8xl font-bold text-stone-500 font-sans">Byte</h1>
          <h1 className="text-8xl font-bold text-teal-500 font-sans ml-[-0.1rem]">
            Corner
          </h1>
        </div>

        {/* Enroll Button to the right of the text */}
        <div className="relative ml-4 mr-10">
          <button className="bg-stone-600 text-white text-sm px-4 py-2 rounded hover:bg-customBlue-lighter absolute bottom-[-15rem]">
            Enrol
          </button>
        </div>
      </div>
    </div>
  );
};

const Features = () => {
  return (
    <div className="relative w-screen h-screen overflow-auto">
      <img
        src={features}
        alt="Features"
        className="object-contain w-full h-full"
      />
    </div>
  );
};

const Feedback = () => {
  return (
    <div className="relative w-screen h-screen overflow-auto">
      <img
        src={feedback}
        alt="Feedback"
        className="object-cover w-full h-full"
      />
    </div>
  );
};

const ExpandableCard = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="bg-teal-600 overflow-hidden mb-4 cursor-pointer border-b border-white">
      <div
        className="flex items-center justify-between p-4"
        onClick={toggleCard}
      >
        <div className="text-lg font-default text-white">{question}</div>
        {isOpen ? (
          <FaChevronUp className="w-6 h-6 text-white" />
        ) : (
          <FaChevronDown className="w-6 h-6 text-white" />
        )}
      </div>
      <div
        className={`card-content p-4 transition-all duration-300 overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        <p
          className={`text-white ${
            isOpen ? "block font-extralight" : "hidden"
          }`}
        >
          {answer}
        </p>
      </div>
    </div>
  );
};

const Faq = () => {
  return (
    <div className="p-8 bg-teal-600">
      <div className="mb-6">
        <h1 className="text-4xl text-white mb-2 font-light ">
          Frequently Asked Questions
        </h1>
      </div>

      <div className="flex flex-col space-y-4">
        <ExpandableCard
          question="How to book a class?"
          answer="Go to the courses page after loging in/ registering, choose your desired course, click enrol"
        />
        <ExpandableCard
          question="How can I cancel a class I registered for?"
          answer="Go to your dashboard, click on classes and choose which class you want to cancel, unenrol from it."
        />
        <ExpandableCard
          question="What do I do if I get into a waiting list?"
          answer="Waiting list means the current class you booked is full. Your waiting list number determines your likeness of joining in case people cancel. The final class list is decided 3 hours prior to class and if you get accepted you can attend."
        />
      </div>
    </div>
  );
};

const HomePage = () => {
  return (
    <div>
      <div className="h-[80px] fixed top-0 w-full z-50">
        <NavBar />
      </div>
      <PilotPage />
      <Features />
      <Feedback />
      <Faq />
      <Footer />
    </div>
  );
};

export default HomePage;
