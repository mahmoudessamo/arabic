// شاشة البداية: اسم اللعبة، اختيار المستوى، زر الصوت
import React from 'react';
import { Volume2, VolumeX, Play, Star } from 'lucide-react';
import { LEVEL_NAMES } from '../data/words';

interface Props {
  onStart: (level: number) => void;
  soundOn: boolean;
  onToggleSound: () => void;
  bestScore: number;
}

const LEVEL_COLORS = [
  'from-green-400 to-emerald-500',
  'from-blue-400 to-indigo-500',
  'from-pink-400 to-rose-500',
  'from-amber-400 to-orange-500',
  'from-purple-400 to-fuchsia-500',
  'from-teal-400 to-cyan-500',
  'from-red-400 to-rose-600',
  'from-indigo-500 to-violet-600',
  'from-yellow-500 to-amber-600',
];

export default function StartScreen({ onStart, soundOn, onToggleSound, bestScore }: Props) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full p-3 sm:p-4 text-center overflow-hidden">
      {/* زر الصوت */}
      <button
        onClick={onToggleSound}
        className="absolute top-3 left-3 bg-white/90 hover:bg-white text-purple-700 rounded-full p-2.5 shadow-lg transition-transform hover:scale-110 active:scale-95 z-10"
        aria-label={soundOn ? 'إيقاف الصوت' : 'تشغيل الصوت'}
      >
        {soundOn ? <Volume2 size={24} /> : <VolumeX size={24} />}
      </button>

      {/* أيقونة وعنوان */}
      <div className="mb-1 text-5xl sm:text-6xl animate-bounce shrink-0">📚</div>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-1 shrink-0">
        أكمل الكلمة
      </h1>
      <p className="text-base sm:text-lg text-white/90 mb-1 font-bold shrink-0">
        لعبة تعليمية ممتعة للأطفال
      </p>

      {bestScore > 0 && (
        <div className="flex items-center gap-2 text-yellow-200 font-bold text-base mb-2 shrink-0">
          <Star size={20} fill="currentColor" />
          <span>أفضل نتيجة: {bestScore}</span>
        </div>
      )}

      <p className="text-white text-lg sm:text-xl font-bold mb-2 shrink-0">اختر المستوى</p>

      {/* شبكة المستويات: عمودان لتوفير المساحة وتجنب التمرير */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 w-full max-w-2xl flex-1 min-h-0 content-center overflow-y-auto px-1">
        {LEVEL_NAMES.map((name, i) => (
          <button
            key={i}
            onClick={() => onStart(i)}
            className={`bg-gradient-to-l ${LEVEL_COLORS[i]} text-white text-base sm:text-xl font-extrabold py-3 sm:py-4 px-3 rounded-2xl shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2`}
          >
            <Play size={20} fill="white" className="shrink-0" />
            <span className="truncate">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
