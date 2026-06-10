// شريط التقدم أعلى الشاشة
import React from 'react';

export default function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1 text-white/90 text-sm font-bold">
        <span>التقدم</span>
        <span>{current} / {total}</span>
      </div>
      <div className="w-full h-4 bg-white/30 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${pct}%`,
            background: 'linear-gradient(90deg, #FFD93D, #6BCB77)',
          }}
        />
      </div>
    </div>
  );
}
