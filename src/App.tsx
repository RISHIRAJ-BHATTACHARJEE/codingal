import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router-dom";
import Timer from "./components/Timer";
import EndClassModal from "./components/EndClassModal";
import { useCountdown } from "./hooks/useCountdown";
import { NavLink } from "./components/NavLink";
import { motion } from "framer-motion";

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { timeLeft, stopTimer } = useCountdown(600);

  const handleEndClass = () => {
    stopTimer();
  };

  return (
    <>
      <nav className="flex items-center justify-between p-4 bg-white shadow-md relative">
        
        <div className="flex items-center gap-4">
          <Link to="/">
            <img
              src="/codingal_logo.jpeg"
              alt="Codingal"
              className="w-15 md:w-20 border-r-2 border-zinc-300 pr-4"
            />
          </Link>
          <h1 className="md:hidden font-semibold text-xl">Codingal</h1>
        </div>

        <div className="hidden md:flex items-center flex-1 justify-between pl-4">
          <h1 className="font-semibold text-lg">Trial Lesson [Grade 1-3]</h1>
          <div className="flex gap-6">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Posts</NavLink>
          </div>

          <div className="flex items-center gap-6">
            <Timer
              timeLeft={timeLeft}
              className="font-semibold text-zinc-600"
            />
            <EndClassModal onEnd={handleEndClass} />
          </div>
        </div>

        <div className="md:hidden flex items-center gap-4">
          <button className="cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-full right-0 left-0 bg-white shadow-lg md:hidden p-4 flex flex-col items-center gap-4 z-50"
          >
            <NavLink to="/">Home</NavLink>
            <NavLink to="/posts">Posts</NavLink>
            <>
              <Timer timeLeft={timeLeft} className="text-lg font-semibold" />
              <EndClassModal onEnd={handleEndClass} />
            </>
          </motion.div>
        )}
      </nav>

      <Outlet />
    </>
  );
};

export default App;
