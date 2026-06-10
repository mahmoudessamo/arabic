// مؤثر النجوم المتطايرة عند الإجابة الصحيحة
import React, { useEffect, useState } from 'react';

interface Star {
  id: number;
  angle: number;
  dist: number;
}

export default function Stars({ show, originKey }: { show: boolean; originKey: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    if (show) {
      const arr: Star[] = Array.from({ length: 12 }, (_, i) => ({
        id: i + Math.random(),
        angle: (360 / 12) * i + Math.random() * 20,
        dist: 80 + Math.random() * 60,
      }));
      setStars(arr);
      const t = setTimeout(() => setStars([]), 900);
      return () => clearTimeout(t);
    }
  }, [show, originKey]);

  if (stars.length === 0) return null;

  return (
    <div className="pointer-events-none absolute inset-0 flex items-center justify-center z-40">
      {stars.map((s) => {
        const rad = (s.angle * Math.PI) / 180;
        const dx = Math.cos(rad) * s.dist;
        const dy = Math.sin(rad) * s.dist;
        return (
          <span
            key={s.id}
            style={{
              position: 'absolute',
              fontSize: '28px',
              ['--dx' as any]: `${dx}px`,
              ['--dy' as any]: `${dy}px`,
              animation: 'starBurst 0.8s ease-out forwards',
            }}
          >
            ⭐
          </span>
        );
      })}
      <style>{`
        @keyframes starBurst {
          0% { transform: translate(0,0) scale(0.3); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) scale(1.2); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
