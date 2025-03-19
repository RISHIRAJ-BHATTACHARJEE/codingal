// App.tsx
import { useState } from "react";
import { Menu } from "lucide-react";
import Timer from "./components/Timer";
import EndClassModal from "./components/EndClassModal";
import { useCountdown } from "./hooks/useCountdown";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isClassEnded, setIsClassEnded] = useState(false);
  const { timeLeft, stopTimer } = useCountdown(600, () => setIsClassEnded(true));

  const handleEndClass = () => {
    stopTimer();
    setIsClassEnded(true);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
      {/* Logo + Mobile Title Container */}
      <div className="flex items-center gap-4">
        <img
          src="/codingal_logo.jpeg"
          alt="Codingal"
          className="w-15 md:w-20 border-r-2 border-zinc-300 pr-4"
        />
        {/* Mobile-only title */}
        <h1 className="md:hidden font-semibold text-xl">Codingal</h1>
      </div>

      {/* Desktop Content */}
      <div className="hidden md:flex items-center flex-1 justify-between pl-4">
        <h1 className="font-semibold">Trial Lesson [Grade 1-3]</h1>
        {!isClassEnded && (
          <div className="flex items-center gap-6">
            <Timer timeLeft={timeLeft} className="font-semibold text-zinc-600" />
            <EndClassModal onEnd={handleEndClass} />
          </div>
        )}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-4">
        <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 left-0 bg-white shadow-lg md:hidden p-4 flex flex-col items-center gap-4 z-50">
          {!isClassEnded && (
            <>
              <Timer timeLeft={timeLeft} className="text-lg font-semibold" />
              <EndClassModal onEnd={handleEndClass} />
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default App;