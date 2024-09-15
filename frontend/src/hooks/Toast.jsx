import * as Toast from "@radix-ui/react-toast";
import { createContext, useContext, useState, useEffect } from "react";
import { HiMiniXMark } from "react-icons/hi2";
import { IoWarning } from "react-icons/io5";
import { IoIosInformationCircle, IoIosHelpCircle } from "react-icons/io";
import { MdOutlineError } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState("normal");
  const [message, setMessage] = useState("");
  const [progress, setProgress] = useState(100);

  const toastStyles = {
    error: "bg-red-50 border-l-4 border-red-400 text-red-600",
    success: "bg-green-50 border-l-4 border-green-400 text-green-600",
    warning: "bg-yellow-50 border-l-4 border-yellow-400 text-yellow-600",
    help: "bg-sky-50 border-l-4 border-sky-400 text-sky-600",
    normal: "bg-gray-50 border-l-4 border-sky-400 text-gray-600",
  };

  const progressBarStyles = {
    error: "bg-red-400",
    success: "bg-green-400",
    warning: "bg-yellow-400",
    help: "bg-sky-400",
    normal: "bg-sky-400",
  };

  const showToast = (toastType, msg) => {
    setType(toastType);
    setMessage(msg);
    setOpen(true);
    setProgress(100);

    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  useEffect(() => {
    if (open) {
      const duration = 3000;
      const stepTime = 30;
      const totalSteps = duration / stepTime;
      let timerId;

      const updateProgress = () => {
        setProgress((prevProgress) => {
          if (prevProgress > 0) {
            return Math.max(prevProgress - 100 / totalSteps, 0);
          } else {
            clearTimeout(timerId);
            return 0;
          }
        });
      };

      timerId = setInterval(updateProgress, stepTime);

      return () => {
        clearInterval(timerId);
        setProgress(100);
      };
    }
  }, [open]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast.Provider swipeDirection="right">
        <Toast.Root
          open={open}
          onOpenChange={setOpen}
          className={`flex items-center p-4 shadow-lg relative ${
            open ? "animate-slideIn" : "animate-slideOut"
          } ${toastStyles[type]}`}
        >
          {type === "success" && (
            <FaCheckCircle className="h-6 w-6 text-green-500 mr-3" />
          )}
          {type === "error" && (
            <MdOutlineError className="h-6 w-6 text-red-500 mr-3" />
          )}
          {type === "warning" && (
            <IoWarning className="h-6 w-6 text-yellow-500 mr-3" />
          )}
          {type === "help" && (
            <IoIosHelpCircle className="h-6 w-6 text-sky-500 mr-3" />
          )}
          {type === "normal" && (
            <IoIosInformationCircle className="h-6 w-6 text-sky-500 mr-3" />
          )}

          <div className="flex-1">
            <Toast.Description className="text-sm text-gray-800">
              {message || `${type}`}
            </Toast.Description>
          </div>

          <Toast.Action asChild altText="Close">
            <button
              className="ml-3 text-gray-600 hover:text-gray-800"
              aria-label="Close"
              onClick={() => setOpen(false)}
            >
              <HiMiniXMark className="h-5 w-5 hover:text-black" />
            </button>
          </Toast.Action>

          <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200">
            <div
              style={{
                width: `${progress}%`,
                transition: "width 0.03s linear",
              }}
              className={`h-full ${progressBarStyles[type]}`}
            ></div>
          </div>
        </Toast.Root>

        <Toast.Viewport className="fixed top-5 right-5 z-50 p-6 space-y-3 w-full max-w-[350px]" />
      </Toast.Provider>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};
