// مؤثر القصاصات الملونة (confetti) عند الإجابة الصحيحة
import React, { useEffect, useState } from 'react';

interface Piece {
  id: number;
  x: number;
  delay: number;
  color: string;
  rotate: number;
  size: number;
}

const COLORS = ['#FF6B6B', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9FF3', '#FFA45B'];

export default function Confetti({ show }: { show: boolean }) {
  const [pieces, setPieces] = useState<Piece[]>([]);

  useEffect(() => {
    if (show) {
      const arr: Piece[] = Array.from({ length: 40 }, (_, i) => ({
        id: i + Math.random(),
        x: Math.random() * 100,
        delay: Math.random() * 0.3,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        rotate: Math.random() * 360,
        size: 8 + Math.random() * 8,
      }));
      setPieces(arr);
      const t = setTimeout(() => setPieces([]), 1800);
      return () => clearTimeout(t);
    }
  }, [show]);

  if (pieces.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((p) => (
        <span
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: '-20px',
            width: p.size,
            height: p.size,
            background: p.color,
            borderRadius: '2px',
            transform: `rotate(${p.rotate}deg)`,
            animation: `confettiFall 1.6s ${p.delay}s ease-in forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
