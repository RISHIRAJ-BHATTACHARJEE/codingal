interface TimerProps {
  timeLeft: number;
  className?: string;
}

const Timer: React.FC<TimerProps> = ({ timeLeft, className = "" }) => {
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return <span className={`${className}`}>{formatTime(timeLeft)}</span>;
};

export default Timer;