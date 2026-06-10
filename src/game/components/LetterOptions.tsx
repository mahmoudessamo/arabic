// أزرار اختيارات الحروف
import React from 'react';

interface Props {
  options: string[];
  onSelect: (letter: string, btnIndex: number) => void;
  // حالة كل زر: 'correct' | 'wrong' | null
  states: Record<number, 'correct' | 'wrong' | null>;
  disabledIndices: number[];
}

const BTN_COLORS = [
  'from-red-400 to-red-500',
  'from-blue-400 to-blue-500',
  'from-yellow-400 to-amber-500',
  'from-green-400 to-emerald-500',
  'from-purple-400 to-fuchsia-500',
];

export default function LetterOptions({ options, onSelect, states, disabledIndices }: Props) {
  return (
    <div className="flex flex-row-reverse justify-center items-center gap-2 sm:gap-3 flex-wrap" dir="rtl">
      {options.map((ltr, i) => {
        const state = states[i];
        const disabled = disabledIndices.includes(i);
        let cls = `bg-gradient-to-b ${BTN_COLORS[i % BTN_COLORS.length]}`;
        if (state === 'correct') cls = 'bg-gradient-to-b from-green-400 to-green-600 scale-110';
        if (state === 'wrong') cls = 'bg-gradient-to-b from-red-500 to-red-700 animate-shake';

        return (
          <button
            key={i}
            onClick={() => !disabled && onSelect(ltr, i)}
            disabled={disabled}
            className={`${cls} text-white text-3xl sm:text-4xl lg:text-5xl font-extrabold w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-xl shadow-lg transition-all duration-200 hover:scale-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center`}
          >
            {ltr}
          </button>
        );
      })}
    </div>
  );
}
