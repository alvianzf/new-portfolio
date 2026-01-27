import { Calendar } from 'lucide-react';

interface CalendarInviteProps {
  id: number;
  x: number; // 0-100 percentage
  y: number; // 0-100 percentage
}

export default function CalendarInvite({ x, y }: CalendarInviteProps) {
  return (
    <div
      className="absolute w-16 h-16 -ml-8 z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
    >
      <div className="w-full h-full bg-blue-500 rounded-xl shadow-lg border-2 border-white flex flex-col items-center justify-center text-white animate-bounce-slight">
        <Calendar className="w-8 h-8 mb-1" />
        <span className="text-[8px] font-bold uppercase">Sync</span>
      </div>
    </div>
  );
}
