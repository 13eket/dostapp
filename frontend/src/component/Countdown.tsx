import { useEffect, useState } from "react";

import { getNextWednesdays } from "../utils/date";

const Countdown = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  });

  useEffect(() => {
    const updateCountdown = () => {
      const [firstWednesday, secondWednesday] = getNextWednesdays();
      let target = firstWednesday; // Directly access the Date object
      const now = new Date();

      if (!target) {
        return;
      }

      if (target.getTime() < now.getTime()) {
        target = secondWednesday;
      }

      if (target === undefined) {
        return;
      }

      const diff = target.getTime() - now.getTime();

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        mins: Math.floor((diff / (1000 * 60)) % 60),
        secs: Math.floor((diff / 1000) % 60),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const unitTranslations = {
    days: "дни",
    hours: "часы",
    mins: "мин",
    secs: "сек",
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h2 className="mb-2 text-sm font-normal">До следующего ужина:</h2>
      <div className="flex gap-0">
        {/* No gap between circles */}
        {Object.entries(timeLeft).map(([unit, value]) => (
          <div key={unit} className="flex flex-col items-center">
            <div className="flex size-12 items-center justify-center rounded-full border border-black text-xl font-normal">
              {value}
            </div>
            <span className="mt-1 text-xs">
              {unitTranslations[unit as keyof typeof unitTranslations]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
