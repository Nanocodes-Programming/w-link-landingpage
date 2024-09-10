import  { useEffect, useRef, useState } from "react";
import anime from "animejs";
import logo from "./assets/logo.svg";

const App = () => {
  const imageRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    anime({
      targets: imageRef.current,
      rotate: "360deg", // Rotates 360 degrees for a full circle
      duration: 3000, // Duration of 3 seconds
      easing: "linear", // Smooth linear rotation
      loop: false, // Run once
      autoplay: true,
      update: (anim) => {
        // Calculate the progress percentage
        const percentage = Math.round((anim.progress / 100) * 100);
        setProgress(percentage);

        // If progress reaches 100%, mark as completed
        if (percentage >= 100) {
          setCompleted(true);
        }
      },
    });
  }, []);
  // Function to get messages based on progress
  const getMessage = (progress) => {
    if (progress < 25) return "Acquiring Computational Resources…";
    if (progress < 45) return "Verifying Browser Signature…";
    if (progress < 100) return "Initiating Wallet Protocol…";
    // return "Completed!";
  };
  // Function to display the different component when loading completes
  const CompletedComponent = () => (
    <div className="flex flex-col justify-center items-center h-screen bg-[#000000]">
      <img src={logo} alt="Completed" className="w-48 h-48 mb-6" />
      <button
        onClick={() => window.open("https://google.com", "_blank")}
        className=" uppercase bg-[#393939] text-white rounded-full px-10 py-3 border-[#FFA549] mt-5 border-[1px] "
      >
        Create W-link
      </button>
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-[#000000]">
      {!completed ? (
        <>
          <img
            ref={imageRef}
            src={logo}
            alt="Rotating"
            className="w-48 h-48 mb-4" 
          />
          <div className="flex items-center gap-4">
            <div className="w-56 bg-gray-200 rounded-full h-6 overflow-hidden">
              <div
                className="bg-[#FFA549] h-full rounded-full"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <span className="text-white">{progress} %</span>
          </div>
          {/* Display the message below the progress bar */}
          <p className="text-white mt-4">{getMessage(progress)}</p>
        </>
      ) : (
        <CompletedComponent />
      )}
    </div>
  );
};

export default App;
