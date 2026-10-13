import { useState, useEffect, useMemo } from "react";
import { passages } from "../data/passages";
import { MdOutlineRestartAlt } from "react-icons/md";
import { GrFormNextLink } from "react-icons/gr";
import Confetti from "react-confetti";

// 1. Define the custom hook directly inside the file
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 1200,
    height: typeof window !== "undefined" ? window.innerHeight : 800,
  });

  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Call handler right away so state gets updated with initial window size
    handleResize();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowSize;
}

export default function Home() {
  const [passageIndex, setPassageIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userHistory, setUserHistory] = useState([]);
  const [score, setScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  // 2. Consume your inline custom hook safely here
  const { width, height } = useWindowSize();

  const characters = useMemo(() => {
    const currentPassage = passages[passageIndex]?.passage || "";
    return currentPassage.split(" ").slice(0, 15).join(" ").split("");
  }, [passageIndex]);

  useEffect(() => {
    if (score === characters.length && characters.length > 0) {
      setShowConfetti(true);
    } else {
      setShowConfetti(false);
    }
  }, [score, characters.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event;
      if (key.length > 1 && key !== "Backspace") return;

      if (key === "Backspace") {
        if (currentIndex > 0) {
          const lastTargetChar = characters[currentIndex - 1];
          const lastTypedChar = userHistory[currentIndex - 1];
          if (lastTargetChar === lastTypedChar) {
            setScore((prev) => Math.max(0, prev - 1));
          }
          setCurrentIndex((prev) => Math.max(0, prev - 1));
          setUserHistory((prev) => prev.slice(0, -1));
        }
      } else if (currentIndex < characters.length) {
        setUserHistory((prev) => [...prev, key]);
        if (key === characters[currentIndex]) {
          setScore((prev) => prev + 1);
        }
        setCurrentIndex((prev) => prev + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, characters, userHistory, score]);

  const handleRestart = () => {
    setCurrentIndex(0);
    setUserHistory([]);
    setScore(0);
  };

  const handleNextTest = () => {
    handleRestart();
    setPassageIndex((prev) => (prev + 1) % passages.length);
  };

  return (
    <section className="flex flex-col items-center justify-center min-h-full bg-[#020C12]">
      {showConfetti && <Confetti width={width} height={height} />}

      <div className="flex flex-col w-1/2">
        <p className="text-white text-xl mr-7">
          {score}/{characters.length}{" "}
          {score > 0 && ` (${Math.round((score / characters.length) * 100)}%)`}
        </p>
        <h1 className="text-3xl tracking-wide leading-11 select-none">
          {characters.map((char, index) => {
            let letterClass =
              "text-[#1AD5FF] [text-shadow:0_0_8px_rgba(26,213,255,0.6)]";
            if (index < currentIndex) {
              const pressedKey = userHistory[index];
              if (char === pressedKey) {
                letterClass =
                  "text-[#FFFFFF] [text-shadow:0_0_8px_rgba(255,255,255,0.8)]";
              } else {
                letterClass =
                  "text-[#FF1A43] [text-shadow:0_0_8px_rgba(255,26,67,0.8)]";
              }
            }
            if (index === currentIndex) {
              letterClass += " border-b-2 border-white animate-pulse";
            }
            return (
              <span key={index} className={letterClass}>
                {char}
              </span>
            );
          })}
        </h1>
      </div>
      <section className="mt-10 gap-16 flex *:hover:text-[#1AD5FF] *:text-[#FFFFFF] *:[text-shadow:0_0_8px_rgba(255,255,255,0.6)] transition-all *:text-3xl">
        <button onClick={handleRestart} className="cursor-pointer">
          <MdOutlineRestartAlt />
        </button>
        <button onClick={handleNextTest} className="cursor-pointer">
          <GrFormNextLink />
        </button>
      </section>
    </section>
  );
}
