import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface Props {
  endsAt: string;
}

function format(ms: number): string {
  const total = Math.max(0, ms);
  const d = Math.floor(total / 86400000);
  const h = Math.floor((total / 3600000) % 24);
  const m = Math.floor((total / 60000) % 60);
  if (d > 0) return `${d}d ${h}h left`;
  if (h > 0) return `${h}h ${m}m left`;
  return `${m}m left`;
}

const DealCountdown = ({ endsAt }: Props) => {
  const target = new Date(endsAt).getTime();
  const [label, setLabel] = useState(() => format(target - Date.now()));

  useEffect(() => {
    const id = setInterval(() => setLabel(format(target - Date.now())), 60000);
    return () => clearInterval(id);
  }, [target]);

  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#FF4526]"
      role="timer"
    >
      <Clock size={12} />
      Ends in {label}
    </span>
  );
};

export default DealCountdown;
