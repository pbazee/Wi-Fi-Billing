"use client";

import { useEffect, useState } from "react";

export function SessionTimer({ totalSeconds = 1800 }: { totalSeconds?: number }) {
  const [seconds, setSeconds] = useState(totalSeconds);

  useEffect(() => {
    const timer = setInterval(() => {
      setSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  return (
    <div className="glass rounded-2xl p-4 text-center">
      <p className="text-xs text-muted-foreground">Session time remaining</p>
      <p className="mt-2 text-3xl font-bold neon-heading">
        {mm}:{ss}
      </p>
    </div>
  );
}
