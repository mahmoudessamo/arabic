// شاشة النهاية
import React, { useEffect } from 'react';
import { RotateCcw, ArrowLeft, Trophy, Check, X } from 'lucide-react';
import { LEVELS } from '../data/words';
import Confetti from './Confetti';

interface Props {
  level: number;
  score: number;
  correct: number;
  wrong: number;
  onReplay: () => void;
  onNextLevel: () => void;
  onHome: () => void;
}

export default function EndScreen({ level, score, correct, wrong, onReplay, onNextLevel, onHome }: Props) {
  const hasNextLevel = level + 1 < LEVELS.length;

  useEffect(() => {
    // confetti يظهر تلقائياً عند ظهور الشاشة
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-full p-6 text-center">
      <Confetti show={true} />

      <div className="text-7xl mb-4 animate-bounce">🏆</div>
      <h1 className="text-4xl sm:text-5xl font-extrabold text-white drop-shadow-lg mb-2">
        رائع!
      </h1>
      <p className="text-2xl text-white/95 font-bold mb-6">لقد أكملت جميع الكلمات</p>

      {/* بطاقة النتيجة */}
      <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-sm mb-6">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Trophy className="text-yellow-500" size={32} fill="currentColor" />
          <span className="text-3xl font-extrabold text-purple-800">{score}</span>
          <span className="text-lg font-bold text-purple-500">نقطة</span>
        </div>

        <div className="flex gap-3 justify-center" dir="rtl">
          <div className="flex-1 bg-green-50 rounded-2xl p-3">
            <div className="flex items-center justify-center gap-1.5 text-green-600 mb-1">
              <Check size={22} />
              <span className="font-extrabold text-2xl">{correct}</span>
            </div>
            <span className="text-sm font-bold text-green-700">صحيحة</span>
          </div>
          <div className="flex-1 bg-red-50 rounded-2xl p-3">
            <div className="flex items-center justify-center gap-1.5 text-red-500 mb-1">
              <X size={22} />
              <span className="font-extrabold text-2xl">{wrong}</span>
            </div>
            <span className="text-sm font-bold text-red-600">خاطئة</span>
          </div>
        </div>
      </div>

      {/* الأزرار */}
      <div className="flex flex-col gap-3 w-full max-w-sm">
        {hasNextLevel && (
          <button
            onClick={onNextLevel}
            className="bg-gradient-to-l from-green-400 to-emerald-500 text-white text-2xl font-extrabold py-4 rounded-3xl shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
          >
            <ArrowLeft size={26} />
            المستوى التالي
          </button>
        )}
        <button
          onClick={onReplay}
          className="bg-gradient-to-l from-blue-400 to-indigo-500 text-white text-2xl font-extrabold py-4 rounded-3xl shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          <RotateCcw size={26} />
          العب مرة أخرى
        </button>
        <button
          onClick={onHome}
          className="bg-white/90 text-purple-700 text-xl font-bold py-3 rounded-3xl shadow-lg transition-transform hover:scale-105 active:scale-95"
        >
          الصفحة الرئيسية
        </button>
      </div>
    </div>
  );
}
